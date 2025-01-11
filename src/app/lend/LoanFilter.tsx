import BoxButton from '@/components/button/boxButton';
import GreyHoverButton from '@/components/button/greyHoverButton';
import { IoRefreshOutline } from "react-icons/io5";
import { useState } from 'react';
import DualRangeSlider from '@/components/DualRangeSlider';

interface LoanFilterProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoanFilter: React.FC<LoanFilterProps> = ({ isOpen, onClose }) => {
  const [yieldRange, setYieldRange] = useState({ min: 0, max: 20 });
  const [recruitmentRange, setRecruitmentRange] = useState({ min: 0, max: 100 });
  const [periodRange, setPeriodRange] = useState({ min: 1, max: 12 });  // 1~12개월

  return (
    <dialog className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">투자 상품 필터</h3>
          <GreyHoverButton>
            <IoRefreshOutline className="w-4 h-4 mr-1" />
            초기화
          </GreyHoverButton>
        </div>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-medium mb-3">정렬</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <input type="radio" name="sort" className="radio radio-primary" value="추천순" />
                <span className="ml-2">추천순</span>
              </div>
              <div className="flex items-center">
                <input type="radio" name="sort" className="radio radio-primary" value="수익률높은순" />
                <span className="ml-2">수익률높은순</span>
              </div>
              <div className="flex items-center">
                <input type="radio" name="sort" className="radio radio-primary" value="모집률높은순" />
                <span className="ml-2">모집률높은순</span>
              </div>
              <div className="flex items-center">
                <input type="radio" name="sort" className="radio radio-primary" value="기간짧은순" />
                <span className="ml-2">기간짧은순</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-3">수익률</h4>
            <DualRangeSlider
              min={0}
              max={20}
              value={yieldRange}
              onChange={setYieldRange}
              unit="%"
            />
          </div>

          <div>
            <h4 className="text-lg font-medium mb-3">모집률</h4>
            <DualRangeSlider
              min={0}
              max={100}
              value={recruitmentRange}
              onChange={setRecruitmentRange}
              unit="%"
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
              isLimit={false}
            />
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
              적용하기
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

export default LoanFilter;