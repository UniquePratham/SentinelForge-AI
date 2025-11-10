import { AuroraLoader } from '@/components/ui/aurora-loader';

export default function DashboardLoading() {
    return (
        <AuroraLoader
            label="Synchronizing agent windows"
            hint="Linking telemetry streams and replaying latest findings..."
        />
    );
}
