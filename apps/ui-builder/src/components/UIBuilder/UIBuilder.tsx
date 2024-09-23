'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas } from './Canvas';
import { HadixApplicationConfig } from '@/core/application-config';
import { ApplicationBuilder } from '@/core/application-builder';
import { ButtonComponent } from '@/hadix-components/sample/ButtonComponent';
import { ContainerComponent } from '@/hadix-components/sample/ContainerComponent';
import { InputComponent } from '@/hadix-components/sample/InputComponent';
import { LabelComponent } from '@/hadix-components/sample/LabelComponent';
import { ApplicationController } from '@/core/application-controller';
import { downloadBlob } from '@/utils/blob';
import { ComponentDefinition } from '@/core/component-system/types';
import { ComponentTree } from './ComponentTree';

const sampleConfig = {
  version: '0.0.1',
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
  const [componentTree, setComponentTree] =
    useState<ComponentDefinition | null>(null);
  const appControllerRef = useRef<ApplicationController | null>(null);
  const rootElementRef = useRef<HTMLDivElement | null>(null);
  const configRef = useRef<HadixApplicationConfig | null>(null);
  if (configRef.current === null) {
    configRef.current = new HadixApplicationConfig(
      sampleConfig.version,
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

  const exportConfig = () => {
    if (configRef.current === null) return;
    const blob = new Blob([configRef.current.toJSON()], {
      type: 'application/json',
    });
    downloadBlob(blob, `config-${Date.now()}.json`);
  };

  useEffect(() => {
    if (configRef.current === null) return;
    setComponentTree(configRef.current.layout);
  }, [configRef.current]);

  return (
    <div className="w-full h-full flex flex-col">
      <header className="w-full h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-10">
        <hgroup className="flex flex-row gap-2 items-baseline">
          <h1 className="text-xl font-bold">Hadix</h1>
          <h2 className="text-sm text-gray-500">UI Builder</h2>
        </hgroup>
        <div className="flex items-center gap-2">
          {/* Github Link */}
          <a
            href="https://github.com/hseoy/hadix"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500"
          >
            Github
          </a>
          {/* Export */}
          <button className="text-sm text-gray-500" onClick={exportConfig}>
            Export
          </button>
        </div>
      </header>

      <div className="w-full h-full flex flex-row">
        {/* SideBar */}
        <div className="w-64 h-full bg-white shadow-md">
          <div className="flex flex-col gap-2 p-4">
            {/* Component Tree */}
            <h3 className="font-bold text-gray-500">Components</h3>
            <div className="flex flex-col gap-2">
              <ComponentTree componentTree={componentTree} />
            </div>
          </div>
        </div>

        {/* Canvas */}
        <Canvas rootElementRef={rootElementRef}></Canvas>
      </div>
    </div>
  );
}
