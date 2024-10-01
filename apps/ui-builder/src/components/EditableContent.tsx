import { useState, useRef, useEffect } from 'react';

interface EditableContentProps {
  content: string;
  onUpdateContent: (content: string) => void;
}

const EditableContent: React.FC<EditableContentProps> = ({
  content,
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

  return isEditing ? (
    <input
      ref={inputRef}
      className="cursor-text text-sm text-gray-500 font-semibold px-2 py-1"
      type="text"
      value={editedContent}
      onChange={e => setEditedContent(e.target.value)}
      onBlur={onFocusOut}
      onKeyDown={handleKeyDown}
    />
  ) : (
    <div
      className="cursor-text text-sm text-gray-500 font-semibold px-2 py-1"
      onClick={handleClick}
    >
      {content}
    </div>
  );
};

export default EditableContent;
