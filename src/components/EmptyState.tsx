import Icon from './Icon';

interface EmptyStateProps {
  readonly icon: string;
  readonly title: string;
  readonly description?: string;
  readonly padding?: 'sm' | 'md' | 'lg';
  readonly className?: string;
}

const paddingMap: Readonly<Record<NonNullable<EmptyStateProps['padding']>, string>> = {
  sm: 'py-10',
  md: 'py-16',
  lg: 'py-20',
};

export default function EmptyState({
  icon,
  title,
  description,
  padding = 'md',
  className = '',
}: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center ${paddingMap[padding]} ${className}`}>
      <Icon name={icon} className="text-muted-zinc text-[48px] mb-4" size="xl" />
      <p className="text-lg font-medium text-deep-ink">{title}</p>
      {description && (
        <p className="text-[15px] text-mid-zinc mt-1 max-w-md">{description}</p>
      )}
    </div>
  );
}
