using System.Threading.Tasks;
using System.Collections.Generic;
using vega.Core.Models;

namespace vega.Core
{
    public interface IPhotoRepository
    {
         Task<IEnumerable<Photo>> GetPhotos(int vehicleId);
    }
}