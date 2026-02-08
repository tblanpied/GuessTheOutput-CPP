#include <iostream>

int outer()
{
    int inner()
    {
        return 2;
    }

    return inner();
}

int main()
{
    std::cout << outer() << '\n';
    return 0;
}
