import { AuroraLoader } from '@/components/ui/aurora-loader';

export default function LoginLoading() {
    return (
        <AuroraLoader
            label="Preparing secure access"
            hint="Authenticating endpoint handshakes and hardening session tunnel..."
        />
    );
}
