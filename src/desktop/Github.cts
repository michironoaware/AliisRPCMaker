import { Octokit } from '@octokit/rest';

export namespace Github {

	const octokit: Octokit = new Octokit();
	
	export namespace Releases {

		export function getLastest() {
			return octokit.repos.getLatestRelease({
				owner: 'RexAliis',
				repo: 'AliisRPCMaker',
			});
		}
	}
}