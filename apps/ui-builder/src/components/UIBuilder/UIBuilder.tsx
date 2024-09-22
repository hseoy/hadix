'use client';

import { useEffect, useRef } from 'react';
import { Canvas } from './Canvas';
import { HadixApplicationConfig } from '@/core/application-config';
import { ApplicationBuilder } from '@/core/application-builder';
import { ButtonComponent } from '@/hadix-components/ButtonComponent';
import { ContainerComponent } from '@/hadix-components/ContainerComponent';
import { InputComponent } from '@/hadix-components/InputComponent';
import { LabelComponent } from '@/hadix-components/LabelComponent';
import { EventDefinition } from '@/core/event-system/types';
import { ApplicationController } from '@/core/application-controller';

const sampleConfig = {
  actions: [
    {
      id: 'submitForm',
      type: 'custom',
      params: {
        script: 'console.log($components.nameInput.getState().value)',
      },
    },
    {
      id: 'logEvent',
      type: 'custom',
      params: {
        script: 'console.log($event.currentTarget.type, $event)',
      },
    },
  ],
  layout: {
    type: 'Container',
    id: 'root',
    events: [{ eventName: 'click', actionId: 'logEvent' }],
    children: [
      {
        type: 'Label',
        id: 'titleLabel',
        props: {
          text: 'User Registration Form',
        },
      },
      {
        type: 'Input',
        id: 'nameInput',
        props: {
          placeholder: 'Enter your name',
        },
      },
      {
        type: 'Input',
        id: 'emailInput',
        props: {
          placeholder: 'Enter your email',
        },
      },
      {
        type: 'Button',
        id: 'submitButton',
        props: {
          label: 'Submit',
        },
        events: [
          {
            eventName: 'click',
            actionId: 'submitForm',
          },
          {
            eventName: 'click',
            actionId: 'logEvent',
          },
        ],
      },
    ],
  },
};

export function UIBuilder() {
  const appControllerRef = useRef<ApplicationController | null>(null);
  const rootElementRef = useRef<HTMLDivElement | null>(null);
  const configRef = useRef<HadixApplicationConfig | null>(null);
  if (configRef.current === null) {
    configRef.current = new HadixApplicationConfig(
      sampleConfig.actions,
      sampleConfig.layout,
    );
  }

  useEffect(() => {
    if (rootElementRef.current === null || configRef.current === null) return;

    const builder = new ApplicationBuilder(rootElementRef.current);
    builder.registerComponent('Button', ButtonComponent);
    builder.registerComponent('Input', InputComponent);
    builder.registerComponent('Container', ContainerComponent);
    builder.registerComponent('Label', LabelComponent);

    builder.loadConfig(configRef.current);

    const appController = builder.build();
    appController.initialize();
    appControllerRef.current = appController;
  }, [rootElementRef.current, configRef.current]);

  useEffect(() => {
    if (appControllerRef.current === null) return;
    appControllerRef.current.addEventListener(
      'submitButton',
      'click',
      (_event: EventDefinition) => {
        console.log('Submit button clicked!');
      },
    );

    setTimeout(() => {
      if (appControllerRef.current === null) return;

      appControllerRef.current.setState({
        lastSubmission: { name: 'John Doe', email: 'john@example.com' },
      });
      appControllerRef.current.updateUI();
    }, 5000);
  }, [appControllerRef.current]);

  const exportConfig = () => {
    if (configRef.current === null) return;

    // Download the config as a JSON file
    const { actions, layout } = configRef.current;
    const blob = new Blob([JSON.stringify({ actions, layout }, null, 2)], {
      type: 'application/json',
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'config.json';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <header className="w-full h-16 bg-white shadow-md flex items-center justify-between px-4">
        <hgroup className="flex flex-row gap-2 items-baseline">
          <h1 className="text-xl font-bold">Hadix</h1>
          <h2 className="text-sm text-gray-500">UI Builder</h2>
        </hgroup>
        <div className="flex items-center gap-2">
          <button className="text-sm text-gray-500">Save</button>
          <button className="text-sm text-gray-500" onClick={exportConfig}>
            Export
          </button>
        </div>
      </header>

      <Canvas rootElementRef={rootElementRef}></Canvas>
    </div>
  );
}
