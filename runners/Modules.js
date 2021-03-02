import Runner from '../modules/Runner.js';

const needFiles = [ 'fighters', 'weapons', 'projectiles', 'scenes', 'effect_areas' ];

export default class Modules extends Runner {
    static config = {
        files: 'modules',
        ignoreFiles: needFiles,
    }

    render() {
        const [ fighters, weapons, projectiles, scenes, effectAreas ] = this.multiReadCsv(needFiles);
        const weaponKeys = [ 'PrimaryWeapon', 'SecondaryWeapon' ];
        const data = this.parse(this.args.raw);

        Object.values(data).forEach((value) => {
            if ('FighterToSpawn' in value) {
                const FighterToSpawn = fighters[value.FighterToSpawn];
                value.FighterToSpawn = { ...FighterToSpawn };

                weaponKeys.forEach((key) => {
                    if (key in FighterToSpawn) {
                        const Weapon = weapons[FighterToSpawn[key]];
                        value.FighterToSpawn[key] = { ...Weapon };

                        if ('ProjectileToLaunch' in Weapon) {
                            const ProjectileToLaunch = projectiles[Weapon.ProjectileToLaunch];
                            value.FighterToSpawn[key].ProjectileToLaunch = { ...ProjectileToLaunch };
                        }
                    }
                });
            }
            if ('Scene' in value) {
                value.Scene = { ...scenes[value.Scene] };
            }
            if ('EffectArea' in value) {
                value.EffectArea = { ...effectAreas[value.EffectArea] };
            }
        });

        return this.newJson(data, this.args.metadata);
    }
}
