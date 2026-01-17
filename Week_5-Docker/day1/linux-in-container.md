# Linux Internals in Docker Containers

## Objective

To understand the internal operating system structure of a Docker container, demonstrating how containers function as isolated Linux processes rather than full virtual machines.

## 1. Container Access

To interact with the container's shell, the `exec` command is used to start an interactive session. This mimics an SSH connection but operates directly through the Docker daemon.

Command:

```bash
docker exec -it <container_name_or_id> /bin/
```

Flags:

-i: Keep STDIN open even if not attached.
-t: Allocate a pseudo-TTY (terminal).
/bin/sh: The specific shell to execute (Alpine Linux uses sh, others may use bash).

## 1. Process Management

Unlike a full OS which runs init systems (systemd) and background daemons, a container is designed to run a single primary process.

Command:

```bash
ps aux
# OR
top
```

Key Learnings:

PID 1: The primary application (e.g., node index.js) is assigned Process ID 1.
Lifecycle: If PID 1 stops or crashes, the entire container stops immediately.
Isolation: The container only sees its own processes, not those of the host machine.

## 3. File System and Disk Usage

Containers utilize a layered file system. Changes made during runtime are written to a temporary writable layer.

Command:

```bash
ls -la /app
df -h
```

Key Learnings:

Structure: The file system mirrors standard Linux directories (/bin, /etc, /proc, /sys).

Disk Usage (df): Displays the available storage, which is effectively a view of the host's storage limits allocated to the Docker daemon.

Ephemeral Data: Files created here are lost when the container is removed unless mapped to a volume.

## 4. User and Permissions

Root Access: If the output is root, the application has unrestricted privileges within the container context.
Best Practice: For production, a specific non-root user should be defined in the Dockerfile to limit attack surface.

## OS Identification

Containers run a minimal Linux distribution distinct from the host operating system.

Command:

```bash
cat /etc/os-release
```

Key Learnings:

Identifies the specific lightweight distribution used (e.g., Alpine Linux), confirming that the container carries its own user-space dependencies independent of the host OS.
