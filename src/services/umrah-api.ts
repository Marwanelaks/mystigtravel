import { apiRequest } from './api';
import {
  UmrahDemand,
  PartenaireProposal,
  CreateDemandDTO,
  CreateProposalDTO,
  PriceBreakdown,
  DemandStatistics,
  PartenaireStatistics,
  AdminProposalStatistics,
  DemandStatus,
  ProposalStatus,
  RejectProposalRequest,
  ValidateProposalRequest
} from '@/types/umrah';

// =============================================================
// 🟢 PUBLIC (CLIENT) ENDPOINTS
// =============================================================
export const umrahPublicAPI = {
  /**
   * Create a new Umrah demand (used by clients)
   */
  createDemand: async (data: CreateDemandDTO): Promise<UmrahDemand> =>
    apiRequest('/demands-umrah', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// =============================================================
// 🟣 ADMIN ENDPOINTS
// =============================================================
export const umrahAdminAPI = {
  /**
   * Get all Umrah demands
   */
  getAllDemands: async (): Promise<UmrahDemand[]> =>
    apiRequest('/demands-umrah/admin'),

  /**
   * Get Umrah demands filtered by status
   */
  getDemandsByStatus: async (status: DemandStatus): Promise<UmrahDemand[]> =>
    apiRequest(`/demands-umrah/admin/status/${status}`),

  /**
   * Get a single demand by ID
   */
  getDemand: async (id: number): Promise<UmrahDemand> =>
    apiRequest(`/demands-umrah/admin/${id}`),

  /**
   * Update a specific demand
   */
  updateDemand: async (id: number, data: Partial<CreateDemandDTO>): Promise<UmrahDemand> =>
    apiRequest(`/demands-umrah/admin/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  /**
   * Add comment to a demand
   */
  addComment: async (id: number, comment: string): Promise<void> =>
    apiRequest(`/demands-umrah/admin/${id}/comment`, {
      method: 'POST',
      body: JSON.stringify({ comment }),
    }),

  /**
   * Validate a demand (optionally assign partenaire)
   */
  validateDemand: async (
    id: number,
    comment: string,
    partenaireId?: number
  ): Promise<UmrahDemand> =>
    apiRequest(`/demands-umrah/admin/${id}/validate`, {
      method: 'PUT',
      body: JSON.stringify({ comment, partenaireId }),
    }),

  /**
   * Reject a demand with comment
   */
  rejectDemand: async (id: number, comment: string): Promise<UmrahDemand> =>
    apiRequest(`/demands-umrah/admin/${id}/reject`, {
      method: 'PUT',
      body: JSON.stringify({ comment }),
    }),

  /**
   * Assign a demand to a specific partenaire
   */
  assignToPartenaire: async (demandId: number, partenaireId: number): Promise<UmrahDemand> =>
    apiRequest(`/demands-umrah/admin/${demandId}/assign/${partenaireId}`, {
      method: 'PUT',
    }),

  /**
   * Get admin-side statistics
   */
  getStatistics: async (): Promise<DemandStatistics> =>
    apiRequest('/demands-umrah/admin/statistics'),

  // -------------------- PROPOSALS --------------------
  getAllProposals: async (): Promise<PartenaireProposal[]> =>
    apiRequest('/proposals/admin'),

  getProposalsByStatus: async (status: ProposalStatus): Promise<PartenaireProposal[]> =>
    apiRequest(`/proposals/admin/status/${status}`),

  getPendingProposals: async (): Promise<PartenaireProposal[]> =>
    apiRequest('/proposals/admin/pending'),

  getProposalsForDemand: async (demandId: number): Promise<PartenaireProposal[]> =>
    apiRequest(`/proposals/admin/demand/${demandId}`),

  getProposalById: async (proposalId: number): Promise<PartenaireProposal> =>
    apiRequest(`/proposals/admin/${proposalId}`),

  /**
   * Validate a proposal
   */
  validateProposal: async (proposalId: number): Promise<PartenaireProposal> =>
    apiRequest(`/proposals/admin/${proposalId}/validate`, {
      method: 'POST',
    }),

  /**
   * Reject a proposal with comment
   */
  rejectProposal: async (proposalId: number, comment: string): Promise<PartenaireProposal> =>
    apiRequest(`/proposals/admin/${proposalId}/reject`, {
      method: 'POST',
      body: JSON.stringify({ comment }),
    }),

  /**
   * Get admin proposal statistics
   */
  getProposalStatistics: async (): Promise<AdminProposalStatistics> =>
    apiRequest('/proposals/admin/statistics'),
};

// =============================================================
// 🟡 PARTENAIRE ENDPOINTS
// =============================================================
export const umrahPartenaireAPI = {
  /**
   * Get demands assigned to current partenaire
   */
  getAssignedDemands: async (): Promise<UmrahDemand[]> =>
    apiRequest('/demands-umrah/partenaire'),

  /**
   * Get a specific assigned demand
   */
  getDemand: async (id: number): Promise<UmrahDemand> =>
    apiRequest(`/demands-umrah/partenaire/${id}`),

  // -------------------- PROPOSALS --------------------

  /**
   * Create new proposal for a demand
   */
  createProposal: async (demandId: number, data: CreateProposalDTO): Promise<PartenaireProposal> =>
    apiRequest(`/proposals/demand/${demandId}`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  /**
   * Update a partenaire proposal
   */
  updateProposal: async (proposalId: number, data: CreateProposalDTO): Promise<PartenaireProposal> =>
    apiRequest(`/proposals/${proposalId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  /**
   * Delete a partenaire proposal
   */
  deleteProposal: async (proposalId: number): Promise<void> =>
    apiRequest(`/proposals/partenaire/${proposalId}`, {
      method: 'DELETE',
    }),

  /**
   * Get all proposals of current partenaire
   */
  getMyProposals: async (): Promise<PartenaireProposal[]> =>
    apiRequest('/proposals/partenaire'),

  /**
   * Get proposals filtered by status
   */
  getMyProposalsByStatus: async (status: ProposalStatus): Promise<PartenaireProposal[]> =>
    apiRequest(`/proposals/partenaire/status/${status}`),

  /**
   * Get a single partenaire proposal by ID
   */
  getProposal: async (proposalId: number): Promise<PartenaireProposal> =>
    apiRequest(`/proposals/partenaire/${proposalId}`),

  /**
   * Get partenaire-specific statistics
   */
  getStatistics: async (): Promise<PartenaireStatistics> =>
    apiRequest('/proposals/partenaire/statistics'),
};

// =============================================================
// 🔵 CALCULATIONS ENDPOINTS
// =============================================================
export const umrahCalculationsAPI = {
  /**
   * Get price breakdown for a proposal
   */
  getPriceBreakdown: async (proposalId: number): Promise<PriceBreakdown> =>
    apiRequest(`/calculations/proposal/${proposalId}/breakdown`),

  /**
   * Get detailed calculation (for dashboards, PDF, etc.)
   */
  getDetailedCalculation: async (proposalId: number): Promise<{
    proposal: PartenaireProposal;
    priceBreakdown: PriceBreakdown;
    totalTravelers: number;
    hotelCategories: string[];
  }> =>
    apiRequest(`/calculations/proposal/${proposalId}/details`),
};

// =============================================================
// 🧩 EXPORT UNIFIED ALIAS
// =============================================================
export const umrahAPI = {
  ...umrahPublicAPI,
  admin: umrahAdminAPI,
  partenaire: umrahPartenaireAPI,
  calculations: umrahCalculationsAPI,
};