import React, { useState } from "react";

const Card = ({ name, mediaLink, onDelete, onEdit }) => {
  const [editing, setEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedMediaLink, setUpdatedMediaLink] = useState(mediaLink);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setUpdatedName(name);
    setUpdatedMediaLink(mediaLink);
  };

  const handleSave = () => {
    onEdit(updatedName, updatedMediaLink);
    setEditing(false);
  };

  return (
    <div className="card">
      {editing ? (
        <div className="edit-form">
          <input
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
          <input
            type="text"
            value={updatedMediaLink}
            onChange={(e) => setUpdatedMediaLink(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <div>
          <h2>{name}</h2>
          <video src={mediaLink} controls />
          <button onClick={handleEdit}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

const CardList = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      name: "Card 1",
      mediaLink: "https://www.w3schools.com/html/mov_bbb.mp4"
    }
  ]);
  const [nextId, setNextId] = useState(3);

  const handleAdd = () => {
    const newCard = {
      id: nextId,
      name: "New Card",
      mediaLink: ""
    };
    setCards([...cards, newCard]);
    setNextId(nextId + 1);
  };

  const handleDelete = (id) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  const handleEdit = (id, updatedName, updatedMediaLink) => {
    setCards(
      cards.map((card) =>
        card.id === id
          ? { ...card, name: updatedName, mediaLink: updatedMediaLink }
          : card
      )
    );
  };

  return (
    <div>
      {cards.map((card) => (
        <Card
          key={card.id}
          name={card.name}
          mediaLink={card.mediaLink}
          onDelete={() => handleDelete(card.id)}
          onEdit={(updatedName, updatedMediaLink) =>
            handleEdit(card.id, updatedName, updatedMediaLink)
          }
        />
      ))}
      <button onClick={handleAdd}>Add Card</button>
    </div>
  );
};

export default CardList;
