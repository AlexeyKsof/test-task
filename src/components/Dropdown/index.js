import { useState, useEffect, useRef } from "react";
import styles from "./index.module.css";

const Dropdown = ({ items = [], callback = () => {} }) => {
  const dropdownEl = useRef(null);
  const [activeItem, setActiveItem] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleUpdateActiveItem = (item) => {
    setActiveItem(item);
    callback(item);
    handleToggleDropdown();
  };

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
    dropdownEl.current && dropdownEl.current.classList.toggle("closed");
  };



  useEffect(() => {
    items.length > 0 && setActiveItem(items[0]);
  }, []);

  return (
    <div
      onClick={(e) => handleToggleDropdown(e)}
      className={styles.dropdown_c}
    >
      <div className={styles.selected}>
        <span>{activeItem}</span>
      </div>
      <div ref={dropdownEl} className={`${isOpen ? styles["drop-content"] : styles['closed'] + " " + styles["drop-content"]}`}>
        <ul>
          {items.map((item, index) => (
            <li key={index} onClick={() => handleUpdateActiveItem(item)}>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
