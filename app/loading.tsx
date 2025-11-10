import { AuroraLoader } from '@/components/ui/aurora-loader';

export default function RootLoading() {
    return (
        <AuroraLoader
            label="Launching SentinelForge"
            hint="Initializing defense fabric and restoring your experience..."
        />
    );
}
