import sec2str from '../js/sec2str.js';

export default [
    [
        ['sec'],
        (opts, v) => sec2str(opts.$t, v),
    ],
    [
        [
            'CooldownMs',
            'FighterSpawnMs',
            'ProjectileLaunchMs',
            'LifetimeMs',
            'FighterLaunchMs',
            'LaunchPeriodMs',
            'UpdateAffectedObjectsPeriodMs',
            'InitializeTimeMs',
            'UpdateAffectedObjectsPeriodMs',
        ],
        ({ $t }, v) => sec2str($t, v / 1000),
    ],
    [
        ['Rarity'],
        ({ $t }, v) => $t(`TID_MODULE_RARITY_${v}`),
    ],
    [
        [
            'TargetStealth',
            'CanTargetFighters',
            'CanTargetFighters',
            'IsStealth',
            'TargetsBS',
            'LaunchFighterWithoutTarget',
            'IsAOE',
            'Hide',
            'TargetFriendly',
            'TargetEnemy',
        ],
        (opts, v) => v ? 'YES' : 'NO',
    ],
];
