import Icon from "@/app/_common/icon/Icon";

interface DrawerProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function Drawer({ title, onClose, children, className }: DrawerProps) {
  return (
    <div className="absolute inset-x-0 top-0 bottom-[89px]">
      {/* Drawer Dimmer */}
      <div
        className="absolute inset-0 bg-gray-5 opacity-[60%]"
        onClick={onClose}
      />
      {/* Drawer */}
      <div
        className={`w-[inherit] h-auto bg-gray-15 absolute bottom-0 left-0 right-0 max-h-[60vh] bg-white rounded-t-[20px] pt-[14px] px-[20px] flex flex-col ${className}`}
      >
        {/* Drawer Header */}
        <div>
          <span className="text-gray-80 text-sm font-bold ">{title}</span>
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
