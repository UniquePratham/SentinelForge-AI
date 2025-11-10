import { AuroraLoader } from '@/components/ui/aurora-loader';

export default function SignupLoading() {
    return (
        <AuroraLoader
            label="Provisioning SentinelForge"
            hint="Spinning up workspaces and securing encryption keys..."
        />
    );
}
