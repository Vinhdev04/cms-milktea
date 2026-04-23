import { UnderDevelopment } from '../../components/ui/UnderDevelopment';

export function UserOffers() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <UnderDevelopment 
        title="Chương trình ưu đãi đang được làm mới" 
        description="Chúng tôi đang thiết kế những chương trình ưu đãi đặc biệt dành riêng cho bạn. Hãy quay lại sớm để nhận những món quà bất ngờ nhé!"
        showBackButton={true}
      />
    </div>
  );
}

