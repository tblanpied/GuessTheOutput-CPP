#include <iostream>

int pick(bool wantTen)
{
    if (wantTen)
        return 10;
}

int main()
{
    std::cout << pick(false) << '\n';
    return 0;
}
