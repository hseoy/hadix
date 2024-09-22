import { ApplicationBuilder } from './application-builder';
import { ButtonComponent } from './components/ButtonComponent';
import { ContainerComponent } from './components/ContainerComponent';
import { InputComponent } from './components/InputComponent';
import { LabelComponent } from './components/LabelComponent';
import { EventDefinition } from './event-system/types';

export const run = ($root: HTMLElement) => {
  // 1. ApplicationBuilder 인스턴스 생성
  const builder = new ApplicationBuilder($root);

  // 2. 컴포넌트 등록
  builder.registerComponent('Button', ButtonComponent);
  builder.registerComponent('Input', InputComponent);
  builder.registerComponent('Container', ContainerComponent);
  builder.registerComponent('Label', LabelComponent);

  // 3. JSON 설정 로드
  const jsonConfig = JSON.stringify({
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
  });
  builder.loadConfig(jsonConfig);

  // 4. 초기 상태 설정
  builder.setInitialState({
    lastSubmission: null,
  });

  // 5. ApplicationController 빌드
  const appController = builder.build();

  // 6. 애플리케이션 초기화 및 실행
  appController.initialize();

  // 7. 이벤트 리스너 예시 (옵션)
  appController.addEventListener(
    'submitButton',
    'click',
    (_event: EventDefinition) => {
      console.log('Submit button clicked!');
    },
  );

  // 8. 상태 변경 예시 (옵션)
  setTimeout(() => {
    appController.setState({
      lastSubmission: { name: 'John Doe', email: 'john@example.com' },
    });
    appController.updateUI();
  }, 5000);

  // 애플리케이션 종료 (필요한 경우)
  // appController.destroy();
};
