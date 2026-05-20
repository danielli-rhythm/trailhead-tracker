# Steering — AWS Access

## How to use AWS credentials

The user has an **administrator role** configured locally as an AWS CLI profile.

- **Profile name:** `saferfleet`
- **Region:** `us-east-1` (default; change in this file if you need a different region)

Every `aws` CLI command you run must include `--profile saferfleet` (and `--region us-east-1` where the command takes one).

### Verifying access before AWS work

Before any task that touches AWS, run:

```bash
aws sts get-caller-identity --profile saferfleet
```

If it fails, **stop** and tell the user to either:
- `aws configure --profile saferfleet` (long-lived keys), or
- `aws sso login --profile saferfleet` (if they're using SSO)

Don't try alternative auth methods on your own.

## Safety rails

Even though the profile is admin, behave conservatively:

1. **Never run destructive commands without confirmation.** That means anything with `delete`, `remove`, `terminate`, `destroy`, or `--force` in it. Print the command, explain what it does, and wait for "yes" before running.

2. **Prefer the AWS Console for first-time resource creation** when the CLI flow involves OAuth handoffs (e.g. connecting Amplify to GitHub). Walk the user through the Console steps in chat; don't try to script around OAuth.

3. **Region consistency.** All resources for this project go in `us-east-1` unless the user says otherwise. If you see resources in other regions during this project, ask.

4. **No new IAM users, no new access keys.** This project uses the existing admin profile only. If you think you need a new IAM principal, stop and ask.

5. **Tagging.** Tag every resource you create with at minimum: `Project=trailhead-tracker`, `ManagedBy=kiro`.

## Cost awareness

This project should cost well under $1/month at idle. If a step would create something that costs more than a few cents per day (e.g. a NAT gateway, an always-on EC2 instance, a provisioned RDS instance), stop and flag it — that's almost certainly the wrong tool.
