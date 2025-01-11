interface DualRangeSliderProps {
    min: number;
    max: number;
    value: { min: number; max: number };
    onChange: (value: { min: number; max: number }) => void;
    step?: number;
    unit?: string;
    isLimit?: boolean;
  }
  
  const DualRangeSlider: React.FC<DualRangeSliderProps> = ({
    min,
    max,
    value,
    onChange,
    step = 1,
    unit = '%',
    isLimit = true
  }) => {
    const displayMaxValue = (value: number) => {
      if (!isLimit && value === max) {
        return '무한대';
      }
      return value;
    };

    return (
      <div>
        <div className="relative h-2 w-full">
          <div className="absolute w-full h-full bg-gray-200 rounded"></div>
          
          <div 
            className="absolute h-full bg-primary rounded"
            style={{
              left: `${((value.min - min) / (max - min)) * 100}%`,
              right: `${100 - ((value.max - min) / (max - min)) * 100}%`
            }}
          ></div>
  
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value.min}
            onChange={(e) => onChange({
              ...value,
              min: Math.min(Number(e.target.value), value.max - step)
            })}
            className="absolute w-full h-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md
              [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 
              [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:cursor-pointer
              [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md"
          />
  
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value.max}
            onChange={(e) => onChange({
              ...value,
              max: Math.max(Number(e.target.value), value.min + step)
            })}
            className="absolute w-full h-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md
              [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 
              [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:cursor-pointer
              [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md"
          />
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <input 
              type="number" 
              className="input input-bordered input-sm w-16 text-center px-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              value={value.min}
              onChange={(e) => {
                const newValue = Number(e.target.value);
                if (newValue >= min && newValue < value.max) {
                  onChange({ ...value, min: newValue });
                }
              }}
            />
            <span className="ml-2">{unit} 이상</span>
          </div>
          <div className="flex items-center">
            {isLimit ? (
              <input 
                type="number" 
                className="input input-bordered input-sm w-16 text-center px-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                value={value.max}
                onChange={(e) => {
                  const newValue = Number(e.target.value);
                  if (newValue <= max && newValue > value.min) {
                    onChange({ ...value, max: newValue });
                  }
                }}
              />
            ) : (
              <input 
                type="text" 
                className="input input-bordered input-sm w-16 text-center px-1"
                value={displayMaxValue(value.max)}
                readOnly
              />
            )}
            <span className="ml-2">{unit} 이하</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default DualRangeSlider;