import BoxButton from '@/components/button/boxButton';
import GreyHoverButton from '@/components/button/greyHoverButton';
import { IoRefreshOutline, IoSparklesOutline } from "react-icons/io5";
import { useState } from 'react';
import DualRangeSlider from '@/components/DualRangeSlider';

interface AiLoanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AiLoanModal: React.FC<AiLoanModalProps> = ({ isOpen, onClose }) => {
  const [creditGrade, setCreditGrade] = useState('');
  const [investmentRange, setInvestmentRange] = useState({ min: 0, max: 100 });
  const [periodRange, setPeriodRange] = useState({ min: 1, max: 12 });
  const [expectedYield, setExpectedYield] = useState(12.5); // 예시 수익률

  const handleReset = () => {
    setCreditGrade('');
    setInvestmentRange({ min: 0, max: 100 });
    setPeriodRange({ min: 1, max: 12 });
  };

  return (
    <dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <IoSparklesOutline className="w-5 h-5 mr-2 text-primary" />
            <h3 className="text-xl font-bold">AI 맞춤 투자 추천</h3>
          </div>
          <GreyHoverButton onClick={handleReset}>
            <IoRefreshOutline className="w-4 h-4 mr-1" />
            초기화
          </GreyHoverButton>
        </div>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-medium mb-3">원하는 신용 등급</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <input type="radio" name="credit" className="radio radio-primary" value="A" />
                <span className="ml-2">A</span>
              </div>
              <div className="flex items-center">
                <input type="radio" name="credit" className="radio radio-primary" value="B" />
                <span className="ml-2">B</span>
              </div>
              <div className="flex items-center">
                <input type="radio" name="credit" className="radio radio-primary" value="C" />
                <span className="ml-2">C</span>
              </div>
              <div className="flex items-center">
                <input type="radio" name="credit" className="radio radio-primary" value="D" />
                <span className="ml-2">D</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-3">원하는 금액</h4>
            <DualRangeSlider
              min={0}
              max={100}
              value={investmentRange}
              onChange={setInvestmentRange}
              unit="만원"
            />
          </div>

          <div>
            <h4 className="text-lg font-medium mb-3">투자기간</h4>
            <DualRangeSlider
              min={0}
              max={37}
              value={periodRange}
              onChange={setPeriodRange}
              unit="개월"
            />
          </div>

          <div className="bg-base-200 p-4 rounded-lg">
            <h4 className="text-lg font-medium mb-2">예상 수익률</h4>
            <p className="text-2xl font-bold text-primary">{expectedYield}%</p>
            <p className="text-sm text-gray-500 mt-1">
              * 실제 수익률은 변동될 수 있습니다.
            </p>
          </div>
        </div>

        <div className="modal-action">
          <div className="flex gap-2 w-full">
            <BoxButton 
              backgroundColor="bg-gray-100" 
              textColor="text-black" 
              className="flex-1"
              onClick={onClose}
            >
              닫기
            </BoxButton>
            <BoxButton className="flex-1">
              추천받기
            </BoxButton>
          </div>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};

export default AiLoanModal;