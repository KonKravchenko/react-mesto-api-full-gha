import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CardContext } from '../contexts/CardContext';
import { useForm } from '../hooks/useForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  // Подписка на контекст
  const currentCard = React.useContext(CardContext);

  const { values, handleChange, setValues } = useForm(currentCard)
  const { name, link } = values;

  React.useEffect(() => {
    setValues(currentCard)
  }, [currentCard]);

  React.useEffect(() => {
    setValues({});
  }, [isOpen]);

  function resetInput(event) {
    onAddPlace.ok && setValues(event.target.reset())
  }

  function handleSubmit(event) {
    event.preventDefault();
    onAddPlace(values);
    resetInput(event)
  }

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      buttonText="Создать"
      btnAriaLabel="Создать новую карточку"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >


      <div className="form__input">
        <input
          className="form__item"
          type="text"
          name="name"
          placeholder="Название"
          autoComplete="off"
          required
          minLength="2"
          maxLength="30"

          value={name ?? ''} onChange={handleChange} />
        <span className="form__item-error"></span>
      </div>

      <div className="form__input">
        <input
          className="form__item form__item_bottom"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          autoComplete="off"
          required

          value={link ?? ''} onChange={handleChange} />
        <span className="form__item-error"></span>
      </div>

    </PopupWithForm>

  )
}

export default AddPlacePopup
