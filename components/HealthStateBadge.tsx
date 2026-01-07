import { getHealthStateIcon } from '@/lib/format-utils';

interface HealthStateBadgeProps {
    healthState: string;
}

const getHealthStateMessage = (state: string): string => {
    const messages: Record<string, string> = {
        TRADE: 'This strategy shows healthy structural characteristics.',
        MONITOR: 'This strategy shows some areas of concern that warrant closer monitoring before deployment.',
        SUPPRESS: 'This strategy is showing structural risk that warrants caution or stopping.',
    };
    return messages[state] || 'Unable to determine health state.';
};

const getHealthStateColor = (state: string): string => {
    const colors: Record<string, string> = {
        TRADE: 'text-green-600',
        MONITOR: 'text-yellow-600',
        SUPPRESS: 'text-red-600',
    };
    return colors[state] || 'text-gray-600';
};

export const HealthStateBadge = ({ healthState }: HealthStateBadgeProps) => {
    const icon = getHealthStateIcon(healthState);
    const message = getHealthStateMessage(healthState);
    const colorClass = getHealthStateColor(healthState);
    const displayState = healthState === 'TRADE' ? 'HEALTHY' : healthState;

    return (
        <div className="bg-card border-2 border-border rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl">
            <div className="flex flex-col items-center text-center gap-4 sm:gap-6">
                <div className="text-6xl sm:text-7xl md:text-8xl">{icon}</div>
                <div className="space-y-3 sm:space-y-4">
                    <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold ${colorClass}`}>{displayState}</h2>
                    <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">{message}</p>
                </div>
            </div>
        </div>
    );
};
