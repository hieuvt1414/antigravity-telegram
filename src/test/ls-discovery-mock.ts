export let mockTrajectories: any[] = [];

export function setMockTrajectories(t: any[]) {
    mockTrajectories = t;
}

export async function getAllTrajectoriesFromLs() {
    return mockTrajectories;
}

export async function getLsConnection() {
    return null;
}

export function invalidateLsCache() {}

export async function getActiveCascadeIdFromLs() {
    return '';
}

export async function cancelCascadeInvocation() {
    return { ok: true };
}
