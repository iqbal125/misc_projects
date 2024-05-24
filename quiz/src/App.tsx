import "./App.css"
import {useState} from "react"

const data = [
  {question: "q 1", description: "d 1"},
  {question: "q 2", description: "d 2"},
  {question: "q 3", description: "d 3"},
  {question: "q 4", description: "d 4"},
  {question: "q 5", description: "d 5"},
]

interface FlashCardPropsI {
  question: string
  description: string
  index: number
  activeIndex: number
  removeCard: (question: string) => void
  updateCard: (question: string, newText: string) => void
}

const FlashCard = ({question, description, index, activeIndex, removeCard, updateCard}: FlashCardPropsI) => {
  const [isActive, setActive] = useState(false)

  return (
    <div>
      {/*{index === activeIndex && (*/}
      <div onClick={() => setActive(!isActive)} className="flash_card">
        {isActive ? (
          <div>
            <div> {question}</div>
            <div>{description}</div>
          </div>
        ) : (
          <div>Click to Activate</div>
        )}
      </div>
      <button onClick={() => removeCard(question)}>Remove</button>
      <button onClick={() => updateCard(question, "RRRRR")}>Update</button>
      {/*)}*/}
    </div>
  )
}

function App() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [cards, setCards] = useState(data)

  const removeCard = (question: string) => {
    const newArr = cards.filter((item) => item.question !== question)
    setCards(newArr)
  }

  const updateCard = (question: string, newText: string) => {
    const itemIdx = cards.findIndex((item) => item.question === question)
    let newArr = cards.map((card) => {
      if (card.question === question) {
        return {
          question: newText,
          description: card.description,
        }
      } else {
        return card
      }
    })
    setCards(newArr)
  }

  return (
    <div>
      {cards.map((item, index) => (
        <FlashCard
          question={item.question}
          description={item.description}
          index={index}
          activeIndex={activeIndex}
          removeCard={removeCard}
          updateCard={updateCard}
        />
      ))}

      <div>
        <button onClick={() => setActiveIndex(activeIndex - 1)}>Previous</button>
        <button onClick={() => setActiveIndex(activeIndex + 1)}>Next</button>
      </div>
    </div>
  )
}

export default App
