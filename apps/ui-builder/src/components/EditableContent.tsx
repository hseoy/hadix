import { useState, useRef, useEffect, ReactNode } from 'react';

interface EditableContentProps {
  content: string;
  prefixContent?: ReactNode;
  onUpdateContent: (content: string) => void;
}

const EditableContent: React.FC<EditableContentProps> = ({
  content,
  prefixContent,
  onUpdateContent,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleClick = () => {
    setEditedContent(content);
    setIsEditing(true);
  };

  const onFocusOut = () => {
    setIsEditing(false);
    if (editedContent !== content) {
      onUpdateContent(editedContent);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      onFocusOut();
    }
  };

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <div className="w-full flex items-center justify-center">
      {isEditing ? (
        <input
          ref={inputRef}
          className="cursor-text px-2 py-1 bg-transparent border-none outline-none text-center w-full"
          type="text"
          value={editedContent}
          onChange={e => setEditedContent(e.target.value)}
          onBlur={onFocusOut}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <div className="cursor-text px-2 py-1" onClick={handleClick}>
          {prefixContent && <span>{prefixContent}</span>}
          {content}
        </div>
      )}
    </div>
  );
};

export default EditableContent;
