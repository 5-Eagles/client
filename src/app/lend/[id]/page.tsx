'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState, useRef, type RefObject } from 'react';
import { getLoanById } from '@/data/loans';
import TopNav from '@/components/TopNav';
import LoanSummaryCard from '@/components/loan_summary_card';
import BoxButton from '@/components/button/boxButton';

export default function LendDetailPage() {
  const router = useRouter();
  const params = useParams();
  const purchaseAmountRef: RefObject<HTMLDivElement> = useRef(null);

  const [insuranceOption, setInsuranceOption] = useState<'apply' | 'none'>('none');
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [showModal, setShowModal] = useState(false);

  const PRICE_PER_UNIT = 1700;

  const loanData = getLoanById(params.id);

  // 유틸리티 함수들을 먼저 정의
  const formatWithUnit = (value: string, unit: string) => {
    if (!value) return '';
    return `${Number(value).toLocaleString()} ${unit}`;
  };

  const removeUnit = (value: string) => {
    return value.replace(/[^0-9.]/g, '');
  };

  const convertPriceToAmount = (price: string) => {
    const numPrice = Number(removeUnit(price));
    return (numPrice / PRICE_PER_UNIT).toString();
  };

  const convertAmountToPrice = (amount: string) => {
    const numAmount = Number(removeUnit(amount));
    return (numAmount * PRICE_PER_UNIT).toString();
  };

  // 유효성 검사 변수를 유틸리티 함수 이후에 정의
  const isValidPurchase = purchaseAmount !== '' && Number(removeUnit(purchaseAmount)) > 0;

  // 이벤트 핸들러들
  const handleInvest = () => {
    if (!isValidPurchase) {
      purchaseAmountRef.current?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    setShowModal(true);
  };

  const handleConfirmInvest = () => {
    setShowModal(false);
    router.push(`/lend/${params.id}/result?amount=${purchasePrice}`);
  };

  // 상환 금액 계산 함수 추가
  const calculateMonthlyPayment = () => {
    if (!purchasePrice || !loanData) return '0';
    const months = parseInt(loanData.stats[1].value);
    const price = Number(removeUnit(purchasePrice));
    return Math.round(price / months).toString();
  };

  if (!loanData) {
    return <div>존재하지 않는 대출 상품입니다.</div>;
  }

  return (
    <div className='flex flex-col h-screen'>
      <TopNav left='back' title='투자하기' />
      
      <div className='flex-1 overflow-y-auto px-4 pb-4'>
        <div className='mt-4'>
          <LoanSummaryCard
            {...loanData}
            href=''
          />
        </div>

        <div className='mt-6 bg-base-100 p-4 rounded-lg'>
          <h2 className='text-lg font-bold mb-4'>투자 수익 정보</h2>
          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span className='text-base-content/60'>순 수익률</span>
              <span className='font-bold'>9.38%</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-base-content/60'>예상 수익률</span>
              <span className='font-bold'>9.32%</span>
            </div>
          </div>
          <p className='text-sm text-base-content/60 mt-2'>
            * 플랫폼 이용료(1.2%)와 세금(15.4%)을 제외한 순 수익금
          </p>
        </div>

        <div className='mt-6 bg-base-100 p-4 rounded-lg'>
          <h2 className='text-lg font-bold mb-4'>차입자 정보</h2>
          <div className='grid grid-cols-2 gap-4'>
            {[
              { label: 'NICE 신용점수', value: '740점' },
              { label: 'PF 스코어', value: '1000점' },
              { label: '상환재원', value: '차주상환' },
              { label: '크레딕스 대출잔액', value: '57,000,000원' },
              { label: '크레딕스 대출 횟수', value: '13회' },
              { label: '크레딕스 연체 횟수', value: '1회' },
            ].map((item, index) => (
              <div key={index}>
                <span className='text-base-content/60 block'>{item.label}</span>
                <span className='font-bold'>{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className='mt-6 bg-base-100 p-4 rounded-lg'>
          <p className='text-sm text-base-content/60'>
            위에 기재된 바와 같이, 대출 심사 시점의 차입자의 소득과 신용점수,
            담보가치 등을 종합하여 차입자의 연계대출 채무의 변제 능력이 있음을
            확인하였습니다. (단, 차입자의 변제능력은 시간의 경과에 따라 변동될
            수 있습니다.)
          </p>
        </div>

        <div className='mt-6 bg-base-100 p-4 rounded-lg space-y-4'>
          <div className='flex justify-between items-center'>
            <span>보유 머니</span>
            <span className='font-bold'>2000 USDT</span>
          </div>

          <div className='form-control w-full' ref={purchaseAmountRef}>
            <label className='label'>
              <span className='label-text'>구매 수량</span>
            </label>
            <input
              type='text'
              className={`input input-bordered w-full ${!isValidPurchase ? 'input-error' : ''}`}
              placeholder='0 USDT'
              value={formatWithUnit(purchaseAmount, 'USDT')}
              onChange={(e) => {
                const value = removeUnit(e.target.value);
                if (value && !isNaN(Number(value))) {
                  setPurchaseAmount(value);
                  setPurchasePrice(convertAmountToPrice(value));
                } else {
                  setPurchaseAmount('');
                  setPurchasePrice('');
                }
              }}
            />
          </div>

          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>구매 금액</span>
            </label>
            <input
              type='text'
              className='input input-bordered'
              placeholder='0 원'
              value={formatWithUnit(purchasePrice, '원')}
              onChange={(e) => {
                const value = removeUnit(e.target.value);
                if (value && !isNaN(Number(value))) {
                  setPurchasePrice(value);
                  setPurchaseAmount(convertPriceToAmount(value));
                } else {
                  setPurchasePrice('');
                  setPurchaseAmount('');
                }
              }}
            />
          </div>

          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>보험 적용</span>
            </label>
            <div className='flex gap-4'>
              <label className='label cursor-pointer'>
                <input
                  type='radio'
                  name='insurance'
                  className='radio radio-primary'
                  checked={insuranceOption === 'apply'}
                  onChange={() => setInsuranceOption('apply')}
                />
                <span className='label-text ml-2'>적용</span>
              </label>
              <label className='label cursor-pointer'>
                <input
                  type='radio'
                  name='insurance'
                  className='radio radio-primary'
                  checked={insuranceOption === 'none'}
                  onChange={() => setInsuranceOption('none')}
                />
                <span className='label-text ml-2'>미적용</span>
              </label>
            </div>
          </div>

          <div className='bg-base-200 p-4 rounded-lg'>
            <div className='flex justify-between mb-2'>
              <span>매달 상환 금액</span>
              <span className='font-bold'>{formatWithUnit(calculateMonthlyPayment(), '원')}</span>
            </div>
            <div className='flex justify-between mb-2'>
              <span>수익률</span>
              <span className='font-bold'>{loanData.stats[0].value}</span>
            </div>
            <div className='flex justify-between'>
              <span>투자 기간</span>
              <span className='font-bold'>{loanData.stats[1].value}</span>
            </div>
          </div>
        </div>
      </div>

      <div className='p-4 bg-white border-t'>
        <BoxButton 
          className={`w-full ${!isValidPurchase ? 'btn-disabled opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleInvest}
          disabled={!isValidPurchase}
        >
          투자하기
        </BoxButton>
      </div>

      {showModal && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">투자 확인</h3>
            <p className="py-4">구매 금액 {formatWithUnit(purchasePrice, '원')}을 정말로 투자하시겠습니까?</p>
            <div className="modal-action">
              <button className="btn btn-primary" onClick={handleConfirmInvest}>네</button>
              <button className="btn" onClick={() => setShowModal(false)}>아니오</button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
