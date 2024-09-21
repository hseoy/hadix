import { ApplicationBuilder } from './application-builder';
import { ButtonComponent } from './components/ButtonComponent';
import { ContainerComponent } from './components/ContainerComponent';
import { InputComponent } from './components/InputComponent';
import { LabelComponent } from './components/LabelComponent';

export const run = ($root: HTMLElement) => {
  // 1. ApplicationBuilder 인스턴스 생성
  const builder = new ApplicationBuilder($root);

  // 2. 컴포넌트 등록
  builder.registerComponent('Button', ButtonComponent);
  builder.registerComponent('Input', InputComponent);
  builder.registerComponent('Container', ContainerComponent);
  builder.registerComponent('Label', LabelComponent);

  // 3. JSON 설정 로드
  const jsonConfig = `
{
  "layout": {
    "type": "Container",
    "id": "root",
    "children": [
      {
        "type": "Label",
        "id": "titleLabel",
        "properties": {
          "text": "User Registration Form"
        }
      },
      {
        "type": "Input",
        "id": "nameInput",
        "properties": {
          "placeholder": "Enter your name"
        }
      },
      {
        "type": "Input",
        "id": "emailInput",
        "properties": {
          "placeholder": "Enter your email"
        }
      },
      {
        "type": "Button",
        "id": "submitButton",
        "properties": {
          "label": "Submit"
        },
        "events": [
          {
            "eventName": "click",
            "actionId": "submitForm"
          }
        ]
      }
    ]
  }
}
`;

  builder.loadConfig(jsonConfig);

  // 4. 액션 정의
  builder.registerAction('submitForm', context => {
    const nameInput = context.$components['nameInput'] as InputComponent;
    const emailInput = context.$components['emailInput'] as InputComponent;

    const name = nameInput.getState().value;
    const email = emailInput.getState().value;

    console.log(context.$state.getState().lastSubmission);
    console.log(`Submitting form: Name - ${name}, Email - ${email}`);

    // 여기에서 API 호출이나 상태 업데이트 등을 수행할 수 있습니다.
    context.$state.setState({
      lastSubmission: { name, email },
    });
  });

  // 5. 초기 상태 설정
  builder.setInitialState({
    lastSubmission: null,
  });

  // 6. ApplicationController 빌드
  const appController = builder.build();

  // 7. 애플리케이션 초기화 및 실행
  appController.initialize();

  // 8. 이벤트 리스너 예시 (옵션)
  appController.addEventListener('submitButton', 'click', (_event: any) => {
    console.log('Submit button clicked!');
  });

  // 9. 상태 변경 예시 (옵션)
  setTimeout(() => {
    appController.setState({
      lastSubmission: { name: 'John Doe', email: 'john@example.com' },
    });
    appController.updateUI();
  }, 5000);

  // 애플리케이션 종료 (필요한 경우)
  // appController.destroy();
};
