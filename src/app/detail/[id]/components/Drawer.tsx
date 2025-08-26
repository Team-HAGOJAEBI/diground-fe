import Icon from "@/app/_common/icon/Icon";

interface DrawerProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function Drawer({ title, onClose, children, className }: DrawerProps) {
  return (
    <div className="absolute inset-x-0 top-0 bottom-[89px] z-10">
      {/* Drawer Dimmer */}
      <div
        className="bg-gray-5 absolute inset-0 opacity-[60%]"
        onClick={onClose}
      />
      {/* Drawer */}
      <div
        className={`bg-gray-15 absolute right-0 bottom-0 left-0 flex max-h-[60vh] flex-col overflow-hidden rounded-t-[20px] px-[20px] pt-[14px] ${className}`}
      >
        {/* Drawer Header */}
        <div>
          <span className="text-gray-80 text-sm font-bold">{title}</span>
          <Icon
            name="close"
            className="absolute top-[14px] right-[20px]"
            onClick={onClose}
          />
        </div>
        {/* Drawer Body */}
        {children}
      </div>
    </div>
  );
}
