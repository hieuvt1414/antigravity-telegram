/**
 * Mock test: simulate ask_question and ask_permission from LS trajectory data
 * → verify the Telegram dialog forwarding pipeline.
 * 
 * Usage: npx ts-node src/scratch/mock-dialog.ts
 */
import { getCascadeTrajectory, getAllTrajectoriesFromLs } from '../services/ls-discovery';

async function main() {
    // Fetch actual ask_question data from cascade 556b1d9f
    const trajs = await getAllTrajectoriesFromLs();
    console.log(`Found ${trajs.length} trajectories\n`);

    for (const t of trajs) {
        const data = await getCascadeTrajectory(t.id);
        const steps = data?.trajectory?.steps || [];
        
        for (let i = 0; i < steps.length; i++) {
            const tc = steps[i].plannerResponse?.toolCalls;
            if (!tc) continue;
            
            for (const call of tc) {
                if (call.name === 'ask_question' || call.name === 'ask_permission') {
                    console.log(`=== ${call.name} found in cascade ${t.id.substring(0,8)} step ${i} ===`);
                    
                    const args = JSON.parse(call.argumentsJson);
                    console.log('\nParsed args:');
                    console.log(JSON.stringify(args, null, 2));

                    // Show what we'd need to forward to Telegram:
                    if (call.name === 'ask_question') {
                        for (const q of args.questions || []) {
                            console.log('\n--- Question ---');
                            console.log(`  Question: ${q.question}`);
                            console.log(`  MultiSelect: ${q.is_multi_select}`);
                            console.log(`  Options:`);
                            (q.options || []).forEach((opt: string, idx: number) => {
                                console.log(`    ${idx + 1}. ${opt}`);
                            });
                        }
                    }
                    
                    if (call.name === 'ask_permission') {
                        console.log('\n--- Permission ---');
                        console.log(`  Action: ${args.Action}`);
                        console.log(`  Target: ${args.Target}`);
                        console.log(`  Reason: ${args.Reason}`);
                    }

                    // Mock the dialog probe structure that handleDialogProbe expects
                    console.log('\n=== Mock dialog probe for Telegram ===');
                    if (call.name === 'ask_question') {
                        const q = args.questions?.[0];
                        if (q) {
                            const mockProbe = {
                                buttons: [
                                    { text: 'Submit', type: 'question' },
                                    { text: 'Skip', type: 'question' }
                                ],
                                options: q.options || [],
                                context: q.question,
                                hash: `question:Submit|question:Skip||${(q.options || []).slice(0, 5).join('|')}`
                            };
                            console.log(JSON.stringify(mockProbe, null, 2));
                        }
                    }
                    
                    console.log('\n');
                }
            }
        }
    }

    // Also check for step statuses that might indicate waiting for input
    console.log('=== Looking for PENDING/WAITING steps ===');
    for (const t of trajs) {
        const data = await getCascadeTrajectory(t.id);
        const steps = data?.trajectory?.steps || [];
        
        for (let i = 0; i < steps.length; i++) {
            const status = steps[i].status;
            if (status && status !== 'CORTEX_STEP_STATUS_DONE' && status !== 'CORTEX_STEP_STATUS_UNSPECIFIED') {
                console.log(`Cascade ${t.id.substring(0,8)} step ${i}: status=${status} type=${steps[i].type}`);
            }
        }
    }
    
    console.log('\nDone!');
}

main().catch(console.error);
