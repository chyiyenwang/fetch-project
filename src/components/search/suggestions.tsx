interface SuggestionsProps {
  suggestions: string[];
  handleSuggestionClick: (event: string) => void;
}

export default function Suggestions({
  suggestions,
  handleSuggestionClick,
}: SuggestionsProps) {  
  return (
    <div className="absolute top-[100px] z-20 max-h-[300px] w-[300px] rounded-large shadow-lg bg-white border-t border-gray-300 overflow-scroll">
      {suggestions.map((breed, index) => {
        return (
          <div
            key={index}
            className='p-4 text-lg hover:bg-gray-100 cursor-pointer transition-colors'
            onClick={() => handleSuggestionClick(breed)}
          >
            {breed}
          </div>
        )
      })}
    </div>
  )
}