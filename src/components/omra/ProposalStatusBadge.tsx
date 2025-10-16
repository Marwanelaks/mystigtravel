import { Badge } from '@/components/ui/badge';
import { ProposalStatus } from '@/types/umrah';

interface ProposalStatusBadgeProps {
  status: ProposalStatus;
  className?: string;
}

export const ProposalStatusBadge = ({ status, className = '' }: ProposalStatusBadgeProps) => {
  const getStatusConfig = (status: ProposalStatus) => {
    switch (status) {
      case 'PENDING':
        return {
          label: 'En Attente',
          variant: 'secondary' as const,
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200'
        };
      case 'VALIDATED':
        return {
          label: 'Validé',
          variant: 'default' as const,
          color: 'bg-green-100 text-green-800 border-green-200'
        };
      case 'REJECTED':
        return {
          label: 'Rejeté',
          variant: 'destructive' as const,
          color: 'bg-red-100 text-red-800 border-red-200'
        };
      case 'MODIFIED':
        return {
          label: 'Modifié',
          variant: 'outline' as const,
          color: 'bg-blue-100 text-blue-800 border-blue-200'
        };
      default:
        return {
          label: status,
          variant: 'secondary' as const,
          color: 'bg-gray-100 text-gray-800 border-gray-200'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <Badge 
      variant={config.variant} 
      className={`${config.color} ${className}`}
    >
      {config.label}
    </Badge>
  );
};