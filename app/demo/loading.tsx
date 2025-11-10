import { AuroraLoader } from '@/components/ui/aurora-loader';

export default function DemoLoading() {
    return (
        <AuroraLoader
            label="Booting demo workspace"
            hint="Assembling sample artifacts and staging guided tour..."
        />
    );
}
