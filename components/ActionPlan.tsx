'use client'

import { ActionPlan as ActionPlanType, ActionItem } from '@/types/slipstream'
import BlurWrapper from './BlurWrapper'

interface Props {
  actionPlan: ActionPlanType
  isUnlocked?: boolean
}

const priorityBadges: Record<string, { label: string; color: string }> = {
  high: { label: 'KRITISCH', color: '#ef4444' },
  medium: { label: 'WICHTIG', color: '#f97316' },
  low: { label: 'EMPFOHLEN', color: '#eab308' },
}

function ActionCard({ item }: { item: ActionItem }) {
  const badge = priorityBadges[item.priority] || priorityBadges.medium
  return (
    <div className="rounded-xl p-4 bg-white/[0.03] border border-white/10">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border"
            style={{ color: badge.color, backgroundColor: badge.color + '15', borderColor: badge.color + '40' }}
          >
            {badge.label}
          </span>
          <span className="text-xs text-gray-500">{item.dimension}</span>
        </div>
        <span className="text-xs text-gray-500 whitespace-nowrap">{item.effort}</span>
      </div>
      <p className="text-sm text-white font-medium">{item.action}</p>
      <p className="text-xs font-light text-gray-400 mt-1">{item.businessImpact}</p>
    </div>
  )
}

export default function ActionPlan({ actionPlan, isUnlocked = true }: Props) {
  const visibleActions = actionPlan.actions.slice(0, 2)
  const gatedActions = actionPlan.actions.slice(2)

  return (
    <div className="rounded-2xl p-4 sm:p-6 bg-white/5 border border-white/10 backdrop-blur-sm">
      <h2 className="font-semibold text-white mb-2">Dein Aktionsplan</h2>
      <p className="text-sm font-light text-gray-400 mb-5">{actionPlan.summary}</p>

      <div className="space-y-3">
        {visibleActions.map((item, i) => (
          <ActionCard key={i} item={item} />
        ))}

        {gatedActions.length > 0 && !isUnlocked && (
          <BlurWrapper bgColor="#0a0a0f">
            <div className="space-y-3">
              {gatedActions.map((item, i) => (
                <ActionCard key={i + 2} item={item} />
              ))}
            </div>
          </BlurWrapper>
        )}

        {gatedActions.length > 0 && isUnlocked &&
          gatedActions.map((item, i) => (
            <ActionCard key={i + 2} item={item} />
          ))
        }
      </div>
    </div>
  )
}
