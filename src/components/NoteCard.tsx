import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import ReactMarkdown from "react-markdown";

import { type RouterOutputs } from "../utils/api";

type Note = RouterOutputs["note"]["getAll"][0];

export const NoteCard = ({
  note,
  onDelete,
}: {
  note: Note;
  onDelete: () => void;
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [isOver, setIsOver] = useState<boolean>(false);

  return (
    <div className="card mt-5 border border-gray-200 bg-base-100 shadow-xl">
      <div className="card-body m-0 p-3">
        <div
          className={`collapse-arrow ${
            isExpanded ? "collapse-open" : ""
          } collapse`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="collapse-title text-xl font-bold">{note.title}</div>
          <div className="collapse-content">
            <article className="prose md:prose-lg">
              <ReactMarkdown>{note.content}</ReactMarkdown>
            </article>
          </div>
        </div>
        <div className="card-actions mx-2 flex justify-end">
          <button
            className="tooltip tooltip-bottom tooltip-accent px-5"
            data-tip="Delete?"
            onClick={onDelete}
            onMouseOver={() => setIsOver(!isOver)}
          >
            <FontAwesomeIcon
              icon={faTrash}
              size="xl"
              style={{ color: "#ff4f4f" }}
              //   title="Delete?"
            />
          </button>
        </div>
      </div>
    </div>
  );
};
