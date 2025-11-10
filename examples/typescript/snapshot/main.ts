import { Daytona } from '@daytonaio/sdk'

// Initialize the Daytona client
const daytona = new Daytona({
  apiUrl: 'https://stage.daytona.work/api',
  apiKey: 'dtn_210c392a61d853c577c9937ad729d2f066bc5e9685369f2bb7fe6f97446bc615',
  target: 'us',
})

async function main() {
  // Create the Sandbox instance
  const sandbox = await daytona.create({
    // snapshot: 'daytonaio/sandbox:0.4.3',
    snapshot: 'vm-experimental',
    language: 'typescript',
    autoStopInterval: 60,
    public: true,
  })

  // Run the code securely inside the Sandbox
  const response = await sandbox.process.codeRun('console.log("Hello World from code!")')
  await sandbox.process.createSession('okinuliste')
  await sandbox.process.executeSessionCommand('okinuliste', {
    command: 'python3 -m http.server 8000',
    async: true,
  })
  console.log(response.result)

  const previewUrl = await sandbox.getPreviewLink(8000)
  console.log(previewUrl)

  // // Test the new snapshotSandbox method
  // console.log('Creating snapshot of the sandbox...');
  // const snapshotRef = await sandbox.snapshotSandbox();
  // console.log(`Created snapshot: ${snapshotRef}`);
}

main().catch((error) => {
  console.error(error)
  process.exit(0)
})

// Clean up
// await daytona.remove(sandbox)
