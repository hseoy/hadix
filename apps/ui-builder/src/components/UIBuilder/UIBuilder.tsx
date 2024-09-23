'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas } from './Canvas';
import { HadixApplicationConfig } from '@/core/application-config';
import { ApplicationBuilder } from '@/core/application-builder';
import { ApplicationController } from '@/core/application-controller';
import { downloadBlob } from '@/utils/blob';
import { ComponentDefinition } from '@/core/component-system/types';
import { ComponentTree } from './ComponentTree';
import { ButtonComponent } from '@/hadix-components/ButtonComponent';
import { InputComponent } from '@/hadix-components/InputComponent';
import { ContainerComponent } from '@/hadix-components/ContainerComponent';
import { TextComponent } from '@/hadix-components/TextComponent';
import { ImageComponent } from '@/hadix-components/ImageComponent';

const sampleConfig = {
  version: '0.0.1',
  actions: [],
  layout: {
    type: 'Container',
    id: 'root',
    props: {
      layout: 'vertical',
    },
    children: [
      {
        type: 'Text',
        id: 'title',
        props: {
          content: 'Hello! This is Hadix.',
          fontSize: '20px',
          fontWeight: 'bold',
          color: 'blue',
          textAlign: 'center',
          padding: '10px',
        },
      },
      {
        type: 'Text',
        id: 'description',
        props: {
          content:
            'Hadix is an open-source Low Code Application Builder aimed at designing and developing production-level applications.',
          fontSize: '16px',
          fontWeight: 'normal',
          color: 'gray',
          textAlign: 'center',
          padding: '10px',
        },
      },
      {
        type: 'Container',
        id: 'container',
        props: {
          layout: 'horizontal',
        },
        children: [
          {
            type: 'Image',
            id: 'image',
            props: {
              src: 'https://picsum.photos/200/300',
              alt: 'Random Image',
              width: 200,
              height: 200,
              padding: '10px',
              margin: '10px',
            },
          },
          {
            type: 'Image',
            id: 'image',
            props: {
              src: 'https://picsum.photos/200/300',
              alt: 'Random Image',
              width: 200,
              height: 200,
              padding: '10px',
              margin: '10px',
            },
          },
          {
            type: 'Image',
            id: 'image',
            props: {
              src: 'https://picsum.photos/200/300',
              alt: 'Random Image',
              width: 200,
              height: 200,
              padding: '10px',
              margin: '10px',
            },
          },
        ],
      },
      {
        type: 'Button',
        id: 'button',
        props: {
          label: 'Click me',
          padding: '10px',
          margin: '10px',
        },
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
    builder.registerComponent('Text', TextComponent);
    builder.registerComponent('Image', ImageComponent);
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
