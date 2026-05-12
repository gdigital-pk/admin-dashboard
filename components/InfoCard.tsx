"use client";

import { ReactNode } from "react";

type InfoCardProps = {
    icon: ReactNode;
    badge: string;
    value: string;
    subtitle: string;
    badgeColor: string;
};

export default function InfoCard({
    icon,
    badge,
    value,
    subtitle,
    badgeColor,
}: InfoCardProps) {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
                {icon}

                <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${badgeColor}`}
                >
                    {badge}
                </span>
            </div>

            <h3 className="mt-6 text-2xl font-black text-slate-900">
                {value}
            </h3>

            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
        </div>
    );
}