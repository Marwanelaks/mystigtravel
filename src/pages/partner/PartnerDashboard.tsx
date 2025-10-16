import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { umrahAPI } from '@/services/umrah-api';
import { UmrahDemand, PartenaireProposal, ProposalStatus, PartenaireStatistics } from '@/types/umrah';
import { Package, FileText, CheckCircle, Clock, TrendingUp, Users, AlertCircle, Edit } from 'lucide-react';
import { Link } from "react-router-dom";
import PartnerLayout from "./PartnerLayout";
import { ProposalStatusBadge } from '@/components/omra/ProposalStatusBadge';

const PartnerDashboard = () => {
  const [assignedDemands, setAssignedDemands] = useState<UmrahDemand[]>([]);
  const [myProposals, setMyProposals] = useState<PartenaireProposal[]>([]);
  const [statistics, setStatistics] = useState<PartenaireStatistics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [demands, proposals, stats] = await Promise.all([
        umrahAPI.partenaire.getAssignedDemands(),
        umrahAPI.partenaire.getMyProposals(),
        umrahAPI.partenaire.getStatistics(),
      ]);
      setAssignedDemands(demands);
      setMyProposals(proposals);
      setStatistics(stats);
    } finally {
      setLoading(false);
    }
  };

  const getProposalsByStatus = (status: ProposalStatus) => {
    return myProposals.filter(proposal => proposal.status === status);
  };

  const getPendingDemands = () => {
    return assignedDemands.filter(demand => 
      demand.status === 'VALIDATED' && 
      !myProposals.some(proposal => proposal.umrahDemand.id === demand.id)
    );
  };

  const stats = [
    {
      title: 'Assigned Demands',
      value: assignedDemands.length,
      icon: Package,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      description: 'Total demands assigned to you'
    },
    {
      title: 'Total Proposals',
      value: statistics?.totalProposals || 0,
      icon: FileText,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      description: 'All proposals created'
    },
    {
      title: 'Pending Review',
      value: statistics?.pendingProposals || 0,
      icon: Clock,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      description: 'Awaiting admin validation'
    },
    {
      title: 'Validated',
      value: statistics?.validatedProposals || 0,
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      description: 'Approved by admin'
    },
  ];

  const getStatusColor = (status: ProposalStatus) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'VALIDATED': return 'bg-green-100 text-green-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      case 'MODIFIED': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <PartnerLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">Partner Dashboard</h1>
                <p className="text-blue-100">Manage your Umrah proposals and assigned demands</p>
              </div>
              <TrendingUp className="h-16 w-16 opacity-20" />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card key={stat.title} className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <div className={`bg-gradient-to-br ${stat.color} p-6 text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`${stat.bgColor} p-3 rounded-lg bg-white/20`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="text-4xl font-bold">{stat.value}</span>
                    </div>
                    <h3 className="text-sm font-medium opacity-90">{stat.title}</h3>
                    <p className="text-xs opacity-75 mt-1">{stat.description}</p>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Quick Actions & Alerts */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Pending Actions */}
            <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-white to-yellow-50/50 lg:col-span-1">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  Quick Actions
                </h2>
              </div>
              
              <div className="space-y-4">
                {/* Pending Demands */}
                {getPendingDemands().length > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Package className="h-5 w-5 text-yellow-600" />
                      <h3 className="font-semibold text-yellow-800">New Demands</h3>
                    </div>
                    <p className="text-sm text-yellow-700 mb-3">
                      You have {getPendingDemands().length} demand(s) waiting for your proposal
                    </p>
                    <Button size="sm" className="w-full bg-yellow-600 hover:bg-yellow-700" asChild>
                      <Link to="/assigned-demands">Create Proposals</Link>
                    </Button>
                  </div>
                )}

                {/* Rejected Proposals */}
                {getProposalsByStatus('REJECTED').length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Edit className="h-5 w-5 text-red-600" />
                      <h3 className="font-semibold text-red-800">Rejected Proposals</h3>
                    </div>
                    <p className="text-sm text-red-700 mb-3">
                      You have {getProposalsByStatus('REJECTED').length} proposal(s) that need modification
                    </p>
                    <Button size="sm" variant="outline" className="w-full border-red-300 text-red-700 hover:bg-red-100" asChild>
                      <Link to="/my-proposals?status=REJECTED">Review & Modify</Link>
                    </Button>
                  </div>
                )}

                {/* Pending Proposals */}
                {getProposalsByStatus('PENDING').length > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="h-5 w-5 text-blue-600" />
                      <h3 className="font-semibold text-blue-800">Under Review</h3>
                    </div>
                    <p className="text-sm text-blue-700">
                      {getProposalsByStatus('PENDING').length} proposal(s) awaiting admin validation
                    </p>
                  </div>
                )}

                {getPendingDemands().length === 0 && getProposalsByStatus('REJECTED').length === 0 && (
                  <div className="text-center py-4">
                    <CheckCircle className="h-8 w-8 mx-auto text-green-400 mb-2" />
                    <p className="text-sm text-muted-foreground">All caught up!</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Recent Demands & Proposals */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-white to-blue-50/50">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Package className="h-5 w-5 text-blue-600" />
                    Recent Demands
                  </h2>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/assigned-demands">View All</Link>
                  </Button>
                </div>
                {assignedDemands.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                    <p className="text-muted-foreground">No demands assigned yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {assignedDemands.slice(0, 5).map((demand) => {
                      const hasProposal = myProposals.some(p => p.umrahDemand.id === demand.id);
                      const proposalStatus = myProposals.find(p => p.umrahDemand.id === demand.id)?.status;
                      
                      return (
                        <div key={demand.id} className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold text-gray-900">Demand #{demand.id}</p>
                              {hasProposal && proposalStatus && (
                                <ProposalStatusBadge status={proposalStatus} />
                              )}
                              {!hasProposal && demand.status === 'VALIDATED' && (
                                <Badge variant="secondary" className="bg-green-100 text-green-800">
                                  Ready for Proposal
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-4 mt-1">
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {demand.travelParty.totalTravelers} travelers
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(demand.departureDate).toLocaleDateString()}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {demand.hotelCategories.join(', ')}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {!hasProposal && demand.status === 'VALIDATED' && (
                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700" asChild>
                                <Link to="/assigned-demands">Create Proposal</Link>
                              </Button>
                            )}
                            <Button size="sm" variant="outline" asChild>
                              <Link to="/assigned-demands">View</Link>
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </Card>

              <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-white to-purple-50/50">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <FileText className="h-5 w-5 text-purple-600" />
                    Recent Proposals
                  </h2>
                  <Button asChild variant="outline" size="sm">
                    <Link to="/my-proposals">View All</Link>
                  </Button>
                </div>
                {myProposals.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                    <p className="text-muted-foreground">No proposals created yet</p>
                    {assignedDemands.length > 0 && (
                      <Button className="mt-2" asChild>
                        <Link to="/assigned-demands">Create Your First Proposal</Link>
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {myProposals.slice(0, 5).map((proposal) => (
                      <div key={proposal.id} className="flex justify-between items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <p className="font-semibold text-lg text-purple-600">
                              {proposal.totalPrice.toLocaleString()} SAR
                            </p>
                            <ProposalStatusBadge status={proposal.status} />
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <p>Demand #{proposal.umrahDemand.id}</p>
                            <p>{proposal.umrahDemand.travelParty.totalTravelers} travelers</p>
                            <p>{new Date(proposal.submittedAt).toLocaleDateString()}</p>
                          </div>
                          {proposal.status === 'REJECTED' && proposal.adminComment && (
                            <p className="text-xs text-red-600 mt-2 line-clamp-1">
                              <strong>Admin:</strong> {proposal.adminComment}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          {proposal.status === 'REJECTED' && (
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700" asChild>
                              <Link to={`/proposals/${proposal.id}/edit`}>Modify</Link>
                            </Button>
                          )}
                          <Button size="sm" variant="outline" asChild>
                            <Link to={`/proposals/${proposal.id}`}>Details</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          </div>

          {/* Status Overview */}
          <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-gray-600" />
              Proposal Status Overview
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { status: 'PENDING' as ProposalStatus, label: 'Pending Review', color: 'bg-yellow-100 text-yellow-800', count: getProposalsByStatus('PENDING').length },
                { status: 'VALIDATED' as ProposalStatus, label: 'Validated', color: 'bg-green-100 text-green-800', count: getProposalsByStatus('VALIDATED').length },
                { status: 'REJECTED' as ProposalStatus, label: 'Rejected', color: 'bg-red-100 text-red-800', count: getProposalsByStatus('REJECTED').length },
                { status: 'MODIFIED' as ProposalStatus, label: 'Modified', color: 'bg-blue-100 text-blue-800', count: getProposalsByStatus('MODIFIED').length },
              ].map((item) => (
                <div key={item.status} className="text-center p-4 bg-white rounded-lg border border-gray-100">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-2 ${item.color}`}>
                    {item.label}
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{item.count}</p>
                  <p className="text-xs text-muted-foreground mt-1">proposals</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </PartnerLayout>
  );
};

export default PartnerDashboard;