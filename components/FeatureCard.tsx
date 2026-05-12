type FeatureCardProps = {
    icon: React.ReactNode;
    title: string;
    text: string;
};

export function FeatureCard({
    icon,
    title,
    text,
}: FeatureCardProps) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-md transition hover:-translate-y-1 hover:shadow-xl">

            <div className="flex justify-center">
                {icon}
            </div>

            <h3 className="mt-4 text-lg font-bold text-slate-900">
                {title}
            </h3>

            <p className="mt-2 text-sm text-slate-500">
                {text}
            </p>
        </div>
    );
}