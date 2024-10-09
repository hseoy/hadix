// 블록(Block) 기본 구조 인터페이스
export interface IBlock {
  id: string; // 블록 고유 ID
  type: string; // 블록 유형 (ex: 'text', 'image', 'button')
  content: string | null; // 블록 콘텐츠
  properties?: IBlockProperties; // 추가 속성 (스타일, 크기, 링크 등)
  editorProperties?: IBlockEditorProperties; // 추가 속성 (스타일, 크기, 링크 등)
  children?: IBlock[]; // 중첩된 블록 배열

  serialize(isEditor?: boolean): string;
}

// 블록 속성 인터페이스
export interface IBlockProperties {
  width?: string; // 블록의 너비 (ex: '100px', '50%')
  height?: string; // 블록의 높이
  style?: object; // 인라인 스타일
}

// 블록 에디터 속성 인터페이스
export interface IBlockEditorProperties {
  position?: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
}

// 전체 페이지 구조를 표현하는 Document 인터페이스
export interface IDocument {
  id: string; // 문서 ID
  blocks: IBlock[]; // 문서에 포함된 블록 배열
  metadata: IDocumentMetadata; // 메타데이터 (작성자, 생성일 등)

  clone({
    blocks,
    metadata,
  }: {
    blocks?: IBlock[];
    metadata?: Partial<IDocumentMetadata>;
  }): IDocument;

  serialize(isEditor?: boolean): string;
}

// 문서 메타데이터 인터페이스
export interface IDocumentMetadata {
  title: string; // 문서 제목
  createdAt: Date; // 생성 일시
  updatedAt: Date; // 수정 일시
}

export interface IEditorHistory {
  getInitialDocument(): IDocument;
  getDocument(): IDocument;
  applyTransaction(transaction: ITransaction): IEditorHistory;
  undo(): IEditorHistory;
  redo(): IEditorHistory;
}

// 에디터 설정 인터페이스
export interface IEditorConfig {
  zoom?: number; // 확대 비율 (100% 기본)
}

// 에디터 상태를 관리하는 인터페이스
export interface IEditorState {
  selection?: ISelectionState; // 사용자 선택 상태 (선택 범위, 커서 위치 등)

  getConfig(): IEditorConfig;
  updateConfig(config: Partial<IEditorConfig>): void;
  getDocument(): IDocument;
  serializeDocument(isEditor?: boolean): string;
  applyTransaction(transaction: ITransaction): IEditorState;
  undo(): IEditorState;
  redo(): IEditorState;
  zoomIn(zoomToAdd?: number): IEditorState;
  zoomOut(zoomToSubtract?: number): IEditorState;
}

// 선택 상태를 관리하는 인터페이스
export interface ISelectionState {
  path: number[]; // 선택된 블록의 경로 (중첩된 위치를 표현하는 인덱스 배열)
  anchor: number | null; // 선택의 시작점 (텍스트 또는 블록 내의 특정 위치)
  focus: number | null; // 선택의 끝점 (텍스트 또는 블록 내의 특정 위치)
}

// 트랜잭션(편집 기록)을 관리하는 인터페이스
export interface ITransaction {
  id: string; // 트랜잭션 ID
  action: string; // 실행된 편집 동작 (ex: 'add', 'remove', 'update')
  timestamp: Date; // 트랜잭션이 발생한 시간
  beforeState: IDocument; // 변경 전 상태
  afterState: IDocument; // 변경 후 상태
}

// 명령어(Commands) 인터페이스
export interface ICommand {
  name: string; // 명령어 이름
  execute: (state: IEditorState) => IEditorState; // 명령 실행 함수
}

export interface ICommandExecutor {
  execute(command: ICommand): IEditorState;
}

export interface ISubscriber<T> {
  (value: T): void;
}

export interface IObservableValue<T> {
  get(): T;
  set(value: T): void;
  subscribe(callback: ISubscriber<T>): () => void; // 구독 해제 함수 반환
  unsubscribe(callback: ISubscriber<T>): void;
}
