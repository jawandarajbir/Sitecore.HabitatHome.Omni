﻿using System.Collections.Generic;
using Sitecore.Data;
using Sitecore.Data.Items;

namespace Sitecore.HabitatHome.Fitness.Feature.Personalization.Services
{
    public interface IItemScoringService
    {
        IEnumerable<Item> ScoreItems([NotNull]IEnumerable<Item> items, [NotNull]Database database);
    }
}