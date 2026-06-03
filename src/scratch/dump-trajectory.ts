/**
 * Dump trajectory steps to find ask_question, ask_permission, plan review structures.
 * Usage: npx ts-node src/scratch/dump-trajectory.ts [cascadeId]
 */
import { getLsConnection, getCascadeTrajectory, getActiveCascadeIdFromLs } from '../services/ls-discovery';

async function main() {
    const cascadeId = process.argv[2] || await getActiveCascadeIdFromLs();
    if (!cascadeId) {
        console.error('No cascadeId found. Pass one as argument or ensure LS is running.');
        process.exit(1);
    }

    console.log(`Fetching trajectory for: ${cascadeId}\n`);
    const data = await getCascadeTrajectory(cascadeId);
    if (!data?.trajectory) {
        console.error('No trajectory data returned');
        process.exit(1);
    }

    const steps = data.trajectory.steps || [];
    console.log(`Total steps: ${steps.length}\n`);

    // Look for interesting step types
    const interestingTypes = [
        'CORTEX_STEP_TYPE_ASK_QUESTION',
        'CORTEX_STEP_TYPE_ASK_PERMISSION', 
        'CORTEX_STEP_TYPE_QUESTION',
        'CORTEX_STEP_TYPE_PERMISSION',
        'CORTEX_STEP_TYPE_PLAN',
        'CORTEX_STEP_TYPE_WALKTHROUGH',
        'CORTEX_STEP_TYPE_ARTIFACT',
    ];

    // Dump all unique step types
    const typeSet = new Set(steps.map((s: any) => s.type));
    console.log('=== All unique step types ===');
    for (const t of typeSet) {
        console.log(`  ${t}`);
    }
    console.log('');

    // Dump last 10 PLANNER_RESPONSE steps to see their full structure
    const plannerSteps = steps.filter((s: any) => s.type === 'CORTEX_STEP_TYPE_PLANNER_RESPONSE');
    const last5 = plannerSteps.slice(-5);
    
    console.log(`=== Last 5 PLANNER_RESPONSE steps (of ${plannerSteps.length} total) ===\n`);
    for (const step of last5) {
        console.log(`--- Step index: ${steps.indexOf(step)} ---`);
        console.log(`Type: ${step.type}`);
        
        // Dump all top-level keys
        const keys = Object.keys(step);
        console.log(`Keys: ${keys.join(', ')}`);
        
        // Check for plannerResponse
        if (step.plannerResponse) {
            const prKeys = Object.keys(step.plannerResponse);
            console.log(`plannerResponse keys: ${prKeys.join(', ')}`);
            
            // Check for toolCalls
            if (step.plannerResponse.toolCalls) {
                console.log(`  toolCalls:`, JSON.stringify(step.plannerResponse.toolCalls, null, 2).substring(0, 500));
            }
            
            // Check for thinking
            if (step.plannerResponse.thinking) {
                console.log(`  thinking (preview): ${String(step.plannerResponse.thinking).substring(0, 100)}...`);
            }
            
            // Check for response
            if (step.plannerResponse.response) {
                console.log(`  response (preview): ${String(step.plannerResponse.response).substring(0, 100)}...`);
            }
        }
        
        // Dump any other interesting fields
        for (const key of keys) {
            if (key !== 'type' && key !== 'plannerResponse') {
                const val = step[key];
                if (val && typeof val === 'object') {
                    console.log(`${key}: ${JSON.stringify(val, null, 2).substring(0, 300)}`);
                } else if (val) {
                    console.log(`${key}: ${String(val).substring(0, 200)}`);
                }
            }
        }
        console.log('');
    }

    // Also look for any step that mentions "question", "permission", "plan" in any field
    console.log('=== Steps containing "question"/"permission"/"ask" in any field ===\n');
    for (let i = 0; i < steps.length; i++) {
        const raw = JSON.stringify(steps[i]).toLowerCase();
        if (raw.includes('ask_question') || raw.includes('ask_permission') || 
            raw.includes('askquestion') || raw.includes('askpermission') ||
            raw.includes('"question"') || raw.includes('"permission"')) {
            console.log(`Step ${i} (${steps[i].type}):`);
            console.log(JSON.stringify(steps[i], null, 2).substring(0, 800));
            console.log('---\n');
        }
    }
}

main().catch(console.error);
