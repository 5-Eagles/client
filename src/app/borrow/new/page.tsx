import LoanApplicationForm from '@/components/LoanApplicationForm';
import BottomNav from '@/components/BottomNav';

export default function NewLoanApplication() {
  return (
    <>
      <h1 className='text-xl font-bold text-center py-4'>대출 신청</h1>
      <div className='w-full max-w-2xl mx-auto pb-20'>
        <LoanApplicationForm />
      </div>
      <BottomNav />
    </>
  );
}
