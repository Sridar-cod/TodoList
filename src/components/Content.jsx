import React, { useState } from "react";

const Content = (props) => {
  const [editId, setEditId] = useState(null);
  const [editContent, setEditContent] = useState("");

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      props.setData((pre) => {
        const updatedList = pre.filter((item) => item.id !== id);
        localStorage.setItem("todo_list", JSON.stringify(updatedList));
        return updatedList;
      });
    }
  };

  const handleEdit = (id, content) => {
    setEditId(id);
    setEditContent(content);
  };

  const handleSave = (id) => {
    props.setData((prev) => {
      const updatedList = prev.map((item) =>
        item.id === id ? { ...item, content: editContent } : item
      );
      localStorage.setItem("todo_list", JSON.stringify(updatedList));
      return updatedList;
    });
    setEditId(null);
    setEditContent("");
  };

  return (
    <div className="content">
      {props.data.length > 0 ? (
        <ul>
          {props.data.map((item) => (
            <li key={item.id} className="">
              {editId === item.id ? (
                <div className="content__editList">
                  <input
                    type="text"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <div className="content__editList__icons">
                    <svg
                      onClick={() => handleSave(item.id)}
                      width={"20px"}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
                    </svg>
                    <svg
                      onClick={() => setEditId(null)}
                      width={"20px"}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                    >
                      <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                    </svg>
                  </div>
                </div>
              ) : (
                <>
                  {item.content}
                  <div className="content__listIcon">
                    <span onClick={() => handleEdit(item.id, item.content)}>
                      <svg
                        width={"20px"}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                      </svg>
                    </span>
                    <span onClick={() => handleDelete(item.id)}>
                      <svg
                        width={"20px"}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                      </svg>
                    </span>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <h2 style={{ textAlign: "center" }}>Your List Is Empty</h2>
      )}
    </div>
  );
};

export default Content;
