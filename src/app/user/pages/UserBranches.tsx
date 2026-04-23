import { UnderDevelopment } from '../../components/ui/UnderDevelopment';

export function UserBranches() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <UnderDevelopment 
        title="Danh sách chi nhánh đang cập nhật" 
        description="Chúng tôi đang nâng cấp hệ thống định vị chi nhánh để phục vụ bạn chính xác hơn. Tính năng này sẽ sớm trở lại!"
        showBackButton={true}
      />
    </div>
  );
}

