#include <iostream>

int x{5};

namespace N
{
    int x{10};
}

int main()
{
    int x{15};

    std::cout << x << ' ' << N::x << ' ' << ::x << '\n';
    return 0;
}
