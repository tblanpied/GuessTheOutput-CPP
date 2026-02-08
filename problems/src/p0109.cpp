#include <iostream>

namespace A
{
    void greet()
    {
        std::cout << "A\n";
    }
}

namespace B
{
    void greet()
    {
        std::cout << "B\n";
    }
}

using namespace A;
using namespace B;

int main()
{
    greet();
    return 0;
}
