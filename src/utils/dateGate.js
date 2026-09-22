// Daily-unlock calendar logic: Day N of the campaign unlocks on October N, 2026,
// and (by design) stays unlocked afterward so visitors can catch up on missed days.

const CAMPAIGN_YEAR = 2026;
const CAMPAIGN_MONTH_INDEX = 9; // October (0-indexed)
export const CAMPAIGN_DAYS = 31;

// Highest day number unlocked as of right now. 0 = campaign hasn't started yet.
// `bypass` (dev mode / ?review=1) treats every day as unlocked.
export const getMaxUnlockedDay = (bypass = false) => {
  if (bypass) return CAMPAIGN_DAYS;

  const now = new Date();
  const campaignStart = new Date(CAMPAIGN_YEAR, CAMPAIGN_MONTH_INDEX, 1, 0, 0, 0, 0);
  const campaignEnd = new Date(CAMPAIGN_YEAR, CAMPAIGN_MONTH_INDEX, CAMPAIGN_DAYS, 23, 59, 59, 999);

  if (now < campaignStart) return 0;
  if (now > campaignEnd) return CAMPAIGN_DAYS;
  return now.getDate();
};

export const isDayUnlocked = (day, bypass = false) => day <= getMaxUnlockedDay(bypass);

export const getCampaignStarted = (bypass = false) => getMaxUnlockedDay(bypass) > 0;

export const getUnlockDateLabel = (day) => {
  const date = new Date(CAMPAIGN_YEAR, CAMPAIGN_MONTH_INDEX, day);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const getCampaignStartLabel = () =>
  new Date(CAMPAIGN_YEAR, CAMPAIGN_MONTH_INDEX, 1).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
