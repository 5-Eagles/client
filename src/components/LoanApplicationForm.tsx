'use client';

import { useState } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { BiLoaderAlt } from 'react-icons/bi';
import { SupabaseClient } from '@supabase/supabase-js';

const convertToKoreanAmount = (amount: string): string => {
  let num = parseInt(amount);
  if (isNaN(num)) return '';

  const units = ['', '만', '억', '조'];
  let result = '';
  let index = 0;

  while (num > 0) {
    const part = num % 10000;
    if (part > 0) {
      result = part + units[index] + ' ' + result;
    }
    num = Math.floor(num / 10000);
    index++;
  }

  return result.trim() + '원';
};

const getCreditGrade = (score: number): string => {
  if (score >= 900) return '1등급';
  if (score >= 870) return '2등급';
  if (score >= 840) return '3등급';
  if (score >= 805) return '4등급';
  if (score >= 750) return '5등급';
  if (score >= 665) return '6등급';
  if (score >= 600) return '7등급';
  return '비적격';
};

export default function LoanApplicationForm() {
  const router = useRouter();
  const supabase: SupabaseClient = createClient();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    loan_amnt: '',
    term: 36,
    credit_score: '',
    grade: 3,
    annual_inc: '',
    purpose: 'debt_consolidation',
    emp_length: 1,
    dti: 35.5,
    delinq_2yrs: 0,
    open_acc: 3,
    pub_rec: 0,
    total_acc: 5,
    home_ownership: 'RENT',
  });

  const [result, setResult] = useState<{
    interest_rate: number | null;
    default_probability: number;
    credit_grade: string;
    approval_status: string;
  } | null>(null);

  const testSupabaseConnection = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Supabase 인증 에러:', error);
        return false;
      }
      console.log('Supabase 연결 정보:', {
        accessToken: !!data.session?.access_token,
        user: data.session?.user,
      });
      return true;
    } catch (err) {
      console.error('Supabase 연결 테스트 실패:', err);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 1. 세션 확인
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      console.log('1. 현재 로그인 정보:', {
        userId: user?.id,
        userEmail: user?.email,
        isLoggedIn: !!user,
      });

      if (!user) {
        throw new Error('로그인이 필요합니다');
      }

      // 2. 현재 users 테이블 데이터 확인 - single() 제거
      const { data: currentUser, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id);

      console.log('2. 현재 DB 데이터:', {
        found: currentUser && currentUser.length > 0,
        userData: currentUser?.[0],
      });

      // API 요청 데이터 확인
      const requestData = {
        loan_amnt: Number(formData.loan_amnt),
        term: formData.term,
        grade: formData.grade,
        emp_length: formData.emp_length,
        annual_inc: Number(formData.annual_inc),
        dti: formData.dti,
        delinq_2yrs: formData.delinq_2yrs,
        open_acc: formData.open_acc,
        pub_rec: formData.pub_rec,
        total_acc: formData.total_acc,
        purpose: formData.purpose,
        home_ownership: formData.home_ownership,
      };
      console.log('API 요청 데이터:', requestData);

      // 3. API 호출
      const response = await fetch(
        'http://localhost:8000/predict/interest_rate',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestData),
        }
      );

      const apiResult = await response.json();
      console.log('API 응답 결과:', apiResult);

      // 4. loan_evaluations 테이블에 저장
      const { data: insertResult, error: insertError } = await supabase
        .from('loan_evaluations')
        .insert([
          {
            user_id: user.id,
            loan_amount: Number(formData.loan_amnt),
            term: formData.term,
            annual_income: Number(formData.annual_inc),
            interest_rate: apiResult.interest_rate,
            credit_grade: apiResult.credit_grade,
            approval_status: apiResult.approval_status,
            created_at: new Date().toISOString(),
            // 추가 정보 저장
            emp_length: formData.emp_length,
            dti: formData.dti,
            delinq_2yrs: formData.delinq_2yrs,
            open_acc: formData.open_acc,
            pub_rec: formData.pub_rec,
            total_acc: formData.total_acc,
            purpose: formData.purpose,
            home_ownership: formData.home_ownership,
            credit_score: formData.credit_score,
          },
        ]);

      console.log('Supabase 저장 결과:', {
        성공: !insertError,
        에러: insertError,
        데이터: insertResult,
      });

      if (insertError) {
        throw insertError;
      }

      setResult(apiResult);
      alert('대출 신청이 완료되었습니다.');
    } catch (error) {
      console.error('전체 에러:', error);
      alert(error.message || '데이터 저장 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-gray-50 min-h-screen'>
      {/* 헤더 */}
      <div className='fixed top-0 left-0 right-0 bg-white z-10 shadow-sm'>
        <div className='flex items-center p-4'>
          <div
            className='p-2 hover:bg-gray-100 rounded-full cursor-pointer'
            onClick={() => router.back()}
          >
            <IoArrowBack className='w-6 h-6' />
          </div>
          <h1 className='text-lg font-bold flex-1 text-center mr-8'>
            대출 신청
          </h1>
        </div>
      </div>

      {/* 메인 폼 */}
      <div className='pt-20 pb-32'>
        <div className='max-w-md mx-auto bg-white rounded-xl shadow-sm p-6 space-y-6'>
          {/* 신용점수 */}
          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>
              신용점수
            </label>
            <input
              type='number'
              value={formData.credit_score}
              onChange={(e) =>
                setFormData({ ...formData, credit_score: e.target.value })
              }
              className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary'
              placeholder='신용점수를 입력하세요'
              min='0'
              max='1000'
              required
            />
            {formData.credit_score && (
              <p
                className={`text-sm ${Number(formData.credit_score) < 600 ? 'text-red-500' : 'text-gray-600'}`}
              >
                {Number(formData.credit_score) < 600
                  ? '신용점수가 600점 미만인 경우 대출 신청이 불가능합니다.'
                  : `신용등급: ${getCreditGrade(Number(formData.credit_score))}`}
              </p>
            )}
          </div>

          {/* 대출 정보 입력 폼 */}
          <div className='space-y-6'>
            {/* 대출금액 */}
            <div className='space-y-2'>
              <label className='block text-sm font-medium text-gray-700'>
                대출금액
              </label>
              <div className='relative'>
                <input
                  type='text'
                  value={formData.loan_amnt}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    setFormData({ ...formData, loan_amnt: value });
                  }}
                  className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary'
                  placeholder='0'
                  required
                />
                <span className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500'>
                  원
                </span>
              </div>
              {formData.loan_amnt && (
                <p className='text-sm text-gray-600'>
                  {convertToKoreanAmount(formData.loan_amnt)}
                </p>
              )}
            </div>

            {/* 대출기간 */}
            <div className='space-y-2'>
              <label className='block text-sm font-medium text-gray-700'>
                대출기간
              </label>
              <select
                value={formData.term}
                onChange={(e) =>
                  setFormData({ ...formData, term: Number(e.target.value) })
                }
                className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary'
              >
                {[6, 12, 24, 36, 60].map((month) => (
                  <option key={month} value={month}>
                    {month}개월
                  </option>
                ))}
              </select>
            </div>

            {/* 근무기간 */}
            <div className='space-y-2'>
              <label className='block text-sm font-medium text-gray-700'>
                근무기간
              </label>
              <select
                value={formData.emp_length}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    emp_length: Number(e.target.value),
                  })
                }
                className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary'
              >
                <option value={0}>경력 없음</option>
                {Array.from({ length: 10 }, (_, i) => i + 1).map((year) => (
                  <option key={year} value={year}>
                    {year}년
                  </option>
                ))}
              </select>
            </div>

            {/* 연소득 */}
            <div className='space-y-2'>
              <label className='block text-sm font-medium text-gray-700'>
                연소득
              </label>
              <div className='relative'>
                <input
                  type='text'
                  value={formData.annual_inc}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    setFormData({ ...formData, annual_inc: value });
                  }}
                  className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary'
                  placeholder='0'
                  required
                />
                <span className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500'>
                  원
                </span>
              </div>
              {formData.annual_inc && (
                <p className='text-sm text-gray-600'>
                  {convertToKoreanAmount(formData.annual_inc)}
                </p>
              )}
            </div>

            {/* 부채비율 */}
            <div className='space-y-2'>
              <label className='block text-sm font-medium text-gray-700'>
                부채비율 (%)
              </label>
              <input
                type='number'
                value={formData.dti}
                onChange={(e) =>
                  setFormData({ ...formData, dti: Number(e.target.value) })
                }
                className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary'
                min='0'
                max='50'
                step='0.1'
              />
            </div>

            {/* 2년내 연체횟수 */}
            <div className='space-y-2'>
              <label className='block text-sm font-medium text-gray-700'>
                2년내 연체횟수
              </label>
              <input
                type='number'
                value={formData.delinq_2yrs}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    delinq_2yrs: Number(e.target.value),
                  })
                }
                className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary'
                min='0'
                max='10'
              />
            </div>

            {/* 개설 계좌수 */}
            <div className='space-y-2'>
              <label className='block text-sm font-medium text-gray-700'>
                개설 계좌수
              </label>
              <input
                type='number'
                value={formData.open_acc}
                onChange={(e) =>
                  setFormData({ ...formData, open_acc: Number(e.target.value) })
                }
                className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary'
                min='0'
                max='40'
              />
            </div>

            {/* 공공기록수 */}
            <div className='space-y-2'>
              <label className='block text-sm font-medium text-gray-700'>
                전과기록수
              </label>
              <input
                type='number'
                value={formData.pub_rec}
                onChange={(e) =>
                  setFormData({ ...formData, pub_rec: Number(e.target.value) })
                }
                className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary'
                min='0'
                max='10'
              />
            </div>

            {/* 총 계좌수 */}
            <div className='space-y-2'>
              <label className='block text-sm font-medium text-gray-700'>
                총 계좌수
              </label>
              <input
                type='number'
                value={formData.total_acc}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    total_acc: Number(e.target.value),
                  })
                }
                className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary'
                min='0'
                max='80'
              />
            </div>

            {/* 대출목적 */}
            <div className='space-y-2'>
              <label className='block text-sm font-medium text-gray-700'>
                대출목적
              </label>
              <select
                value={formData.purpose}
                onChange={(e) =>
                  setFormData({ ...formData, purpose: e.target.value })
                }
                className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary'
              >
                <option value='debt_consolidation'>부채통합</option>
                <option value='credit_card'>신용카드</option>
                <option value='home_improvement'>주택개선</option>
                <option value='major_purchase'>주요구매</option>
                <option value='small_business'>소규모사업</option>
                <option value='car'>자동차</option>
                <option value='medical'>의료</option>
                <option value='moving'>이사</option>
                <option value='vacation'>휴가</option>
                <option value='house'>주택</option>
                <option value='wedding'>결혼</option>
                <option value='educational'>교육</option>
                <option value='other'>기타</option>
              </select>
            </div>

            {/* 주거상태 */}
            <div className='space-y-2'>
              <label className='block text-sm font-medium text-gray-700'>
                주거상태
              </label>
              <select
                value={formData.home_ownership}
                onChange={(e) =>
                  setFormData({ ...formData, home_ownership: e.target.value })
                }
                className='w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary'
              >
                <option value='RENT'>임대</option>
                <option value='MORTGAGE'>주택담보대출</option>
                <option value='OWN'>자가</option>
                <option value='OTHER'>기타</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className='fixed bottom-16 left-0 right-0 p-4'>
        <div className='max-w-md mx-auto'>
          <button
            type='button'
            className='w-full bg-primary text-white py-4 rounded-lg text-lg font-medium hover:bg-primary-dark transition-colors shadow-lg'
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? '심사 중...' : '대출 신청하기'}
          </button>
        </div>
      </div>

      {/* 로딩 모달 */}
      {isLoading && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg p-6 flex flex-col items-center'>
            <BiLoaderAlt className='w-12 h-12 text-primary animate-spin mb-4' />
            <p className='text-lg font-medium'>대출 심사 중입니다</p>
            <p className='text-sm text-gray-500 mt-2'>잠시만 기다려주세요...</p>
          </div>
        </div>
      )}

      {/* 결과 모달 */}
      {result && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg p-6 w-full max-w-sm'>
            <h3 className='text-xl font-bold mb-4'>심사 결과</h3>
            <div className='space-y-3'>
              <p className='text-lg'>
                승인 상태:
                <span
                  className={
                    result.approval_status === 'Approved'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }
                >
                  {result.approval_status === 'Approved' ? ' 승인' : ' 거절'}
                </span>
              </p>
              {result.interest_rate && (
                <p className='text-lg'>
                  이자율:{' '}
                  <span className='font-bold'>
                    {result.interest_rate.toFixed(2)}%
                  </span>
                </p>
              )}
              <p className='text-lg'>
                신용등급:{' '}
                <span className='font-bold'>{result.credit_grade}</span>
              </p>
            </div>
            <button
              onClick={() => {
                setResult(null);
                if (result.approval_status === 'Approved') {
                  router.push('/mypage'); // 또는 다른 적절한 페이지로 이동
                }
              }}
              className='w-full bg-primary text-white py-3 rounded-lg mt-6'
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
