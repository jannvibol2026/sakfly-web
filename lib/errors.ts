import { ApiError } from "@/types/api";

/**
 * Thrown by every placeholder service method (features/[featureName]/services).
 *
 * Sprint 1 ships no backend (per this deliverable's explicit constraints:
 * "No backend implementation", "Use Placeholder Service Layer"). Rather
 * than fabricate fake success responses — which would be mock business
 * logic wearing a service-layer costume — every placeholder method fails
 * honestly and predictably with this error. UI code (forms, loaders) is
 * written exactly as it would be against the real API, and this error
 * exercises its genuine error-handling path end-to-end.
 *
 * When the real API client lands, only `lib/service-provider.ts`'s
 * bindings change — no consuming component or hook is touched, per
 * 01-frontend-architecture.md §8.6's api-client boundary.
 */
export class ServiceNotImplementedError extends ApiError {
  constructor(operation: string) {
    super(
      {
        code: "CONFIG_ERROR",
        message: `${operation} is not yet available. The SAKFLY API is not connected in this build.`,
        requestId: "local-dev-placeholder",
      },
      503,
    );
    this.name = "ServiceNotImplementedError";
  }
}
